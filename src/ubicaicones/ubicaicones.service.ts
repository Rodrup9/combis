import { Injectable } from '@nestjs/common';
import { CreateUbicaiconeDto } from './dto/create-ubicaicone.dto';
import { UpdateUbicaiconeDto } from './dto/update-ubicaicone.dto';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubicaicones } from './entities/ubicaicone.entity';
import { BusesService } from 'src/buses/buses.service';
import { RutaService } from 'src/ruta/ruta.service';
import { ParadasService } from 'src/paradas/paradas.service';
import { Checador } from './entities/checador.entity';

interface ConnectedClients {
  [id: string] : Socket
}

interface Ubications {
  id: string;
  lat: number;
  lng: number;
  rutaId: string;
  busId: string;
}

@Injectable()
export class UbicaiconesService {
  private connectedClients: ConnectedClients = {};

  private ubicationsSave: Ubications[] = []

  constructor(
    @InjectRepository(Ubicaicones)
    private readonly ubicaiconesRepository: Repository<Ubicaicones>,
    @InjectRepository(Checador)
    private readonly checadorRepository: Repository<Checador>,
    private readonly busService: BusesService,
    private readonly rutaService: RutaService,
    private readonly paradaService: ParadasService,
  ) {}

  registerClient(client: Socket) {
    this.connectedClients[client.id] = client;    
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  async saveUbication(ubications: Ubications) {

    // const ubi = this.ubicationsSave.filter(u => u.id !== ubications.id);
    const bus = await this.busService.findOne(ubications.busId);

    const newUbicacion = this.ubicaiconesRepository.create({
      latitud: ubications.lat,
      longitud:ubications.lng,
      bus
    });

    return this.ubicaiconesRepository.save(newUbicacion);
    // this.ubicationsSave = [...ubi, ubications];
  }

  updateLocation() {
    return this.ubicationsSave;
  }

  async showRouteUbication(rutaId: string) {
    const route = await this.rutaService.findOne(rutaId);
    
  }

  async getLocationsByRoute(rutaId: string) {
    try {
      const ruta = await this.rutaService.findOne(rutaId);
  
      // Obtener todos los buses de la ruta
      const buses = await this.busService.findAllByRoute(rutaId);
  
      const ubicaciones = await Promise.all(
        buses.map(async (bus) => {
          const ubicacion = await this.ubicaiconesRepository.findOne({
            where: { bus: { id: bus.id } },
            order: { actualizado_en: 'DESC' },  // Última ubicación registrada
          });
  
          return {
            busId: bus.id,
            numero: bus.numero,
            lat: ubicacion?.latitud ?? 0,
            lng: ubicacion?.longitud ?? 0,
          };
        })
      );
  
      return {
        ruta: ruta.nombre,
        ubicaciones,
      };
    } catch (error) {
      console.error('Error al obtener ubicaciones por ruta:', error);
      throw new Error('No se pudieron obtener las ubicaciones');
    }
  }

  async saveChecador(busId: string, rutaId: string, paradaId: string) {
    const bus = await this.busService.findOne(busId);
    const ruta = await this.rutaService.findOne(rutaId);
    const parada = await this.paradaService.findOne(paradaId);

    const newChecador = this.checadorRepository.create({ bus, ruta, parada });
    return this.checadorRepository.save(newChecador);
  }

  async checkNearbyParada(busId: string, rutaId: string, lat: number, lng: number) {
    const ruta = await this.rutaService.findOne(rutaId);
    const paradas = ruta.paradas.sort((a, b) => {
      console.log(a.orden - b.orden);
      return a.orden - b.orden
      
    });
    console.log(paradas);
    
    for (const parada of paradas) {
        const distance = haversine(lat, lng, parada.latitud, parada.longitud);
        console.log(distance);
        
        if (distance <= 10) {
            // Guardar en la tabla de checador
            await this.saveChecador(busId, rutaId, parada.id);

            // Calcular el tiempo desde la última llegada
            const lastChecador = await this.checadorRepository.findOne({
                where: { parada: { id: parada.id }, ruta: { id: rutaId } },
                order: { fecha_hora: 'DESC' },
            });

            const timeDiff = lastChecador ? (new Date().getTime() - new Date(lastChecador.fecha_hora).getTime()) / 1000 : 0;
            
            // Emitir al bus que llegó
            const client = this.connectedClients[busId];
            client?.emit('parada-llegada', {
                parada: parada.nombre,
                tiempo: timeDiff,
            });

            console.log(`Bus ${busId} llegó a parada ${parada.nombre}, tiempo desde el último: ${timeDiff} segundos.`);
            break;
        }
    }
  }

} 

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Radio de la Tierra en metros
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const deltaPhi = (lat2 - lat1) * Math.PI / 180;
  const deltaLambda = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
