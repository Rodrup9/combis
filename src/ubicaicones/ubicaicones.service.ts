import { Injectable } from '@nestjs/common';
import { CreateUbicaiconeDto } from './dto/create-ubicaicone.dto';
import { UpdateUbicaiconeDto } from './dto/update-ubicaicone.dto';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubicaicones } from './entities/ubicaicone.entity';
import { BusesService } from 'src/buses/buses.service';
import { RutaService } from 'src/ruta/ruta.service';

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
    private readonly busService: BusesService,
    private readonly rutaService: RutaService,
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
} 
