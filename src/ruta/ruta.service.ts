import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { Repository } from 'typeorm';
import { BusesService } from 'src/buses/buses.service';
import { ParadasService } from 'src/paradas/paradas.service';
import { RutaParadaService } from 'src/ruta-parada/ruta-parada.service';
import { CreateRutaParadaDto } from 'src/ruta-parada/dto/create-ruta-parada.dto';

@Injectable()
export class RutaService {
  constructor(
    @InjectRepository(Ruta)
    private readonly rutaRepository: Repository<Ruta>,
    @Inject(forwardRef(() => BusesService))
    private readonly busesService: BusesService,
    private readonly paradasService: ParadasService,
    private readonly rutaParadaService: RutaParadaService
  ) {}

  async create(createRutaDto: CreateRutaDto) {
    const { combis, paradas, ...rutaRest } = createRutaDto;

    const [buses, paradasE] = await Promise.all([
      combis?.length > 0 
        ? Promise.all(combis.map(async combi => await this.busesService.findOne(combi)))
        : Promise.resolve([]),
  
      paradas?.length > 0 
        ? Promise.all(paradas.map(async parada => await this.paradasService.findOne(parada?.id)))
        : Promise.resolve([])
    ]);

    const ruta = this.rutaRepository.create({
      ...rutaRest,
      buses,
    })

    const savedRuta = await this.rutaRepository.save(ruta);

    const createRutaParadaDto: CreateRutaParadaDto[] = paradasE.map( parada => {
      const paradaOrden = paradas.find( pa => pa.id === parada.id );
      return { parada, orden: paradaOrden.orden, ruta: savedRuta  };
    })

    const rutasParadas = await Promise.all(
      createRutaParadaDto.map(async create => await this.rutaParadaService.create(create))
    );

    ruta.rutaParadas = rutasParadas;

    return ruta;
  }

  async findAll() {
    const rutas = await this.rutaRepository.find({
      relations: ['buses', 'rutaParadas', 'rutaParadas.parada']
    });
    return rutas.map(({rutaParadas, ...rutaRest}) => {
      return {
        ...rutaRest,
        paradas: rutaParadas.map(({orden, parada: { rutaParadas, ...parada }}) => {
          return { ...parada, orden };
        }),        
      }
    });
  }

  async findOne(id: string) {
    const route = await this.rutaRepository.findOne({
      where: { id },
      relations: ['rutaParadas', 'rutaParadas.parada'], // Carga las paradas relacionadas
    });
    if (!route)
      throw new BadRequestException('Route not found');

    return route;
  }

  async findOneParse(id: string) {
    const route = await this.findOne(id);

    return {
      id: route.id,
      nombre: route.nombre,
      paradas: route.rutaParadas.map((rp) => ({
        id: rp.parada.id,
        nombre: rp.parada.nombre,
        latitud: rp.parada.latitud,
        longitud: rp.parada.longitud,
        orden: rp.orden,
      })),
      buses: route.buses.map((bus) => ({
        id: bus.id,
        numero: bus.numero,
        matricula: bus.matricula,
      })),
    };
  }

  update(id: number, updateRutaDto: UpdateRutaDto) {
    return `This action updates a #${id} ruta`;
  }

  remove(id: number) {
    return `This action removes a #${id} ruta`;
  }

}
