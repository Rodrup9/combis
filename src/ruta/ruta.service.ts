import { Injectable } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { Repository } from 'typeorm';
import { BusesService } from 'src/buses/buses.service';
import { ParadasService } from 'src/paradas/paradas.service';

@Injectable()
export class RutaService {
  constructor(
    @InjectRepository(Ruta)
    private readonly rutaRepository: Repository<Ruta>,
    private readonly busesService: BusesService,
    private readonly paradasService: ParadasService,
  ) {}

  async create(createRutaDto: CreateRutaDto) {
    const { combis, paradas, ...rutaRest } = createRutaDto;

    const buses = await Promise.all(combis.map(async combi => await this.busesService.findOne(combi)))

    const ruta = this.rutaRepository.create({
      ...rutaRest,

    })
  }

  findAll() {
    return `This action returns all ruta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ruta`;
  }

  update(id: number, updateRutaDto: UpdateRutaDto) {
    return `This action updates a #${id} ruta`;
  }

  remove(id: number) {
    return `This action removes a #${id} ruta`;
  }
}
