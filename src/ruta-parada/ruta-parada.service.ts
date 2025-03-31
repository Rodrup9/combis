import { Injectable } from '@nestjs/common';
import { CreateRutaParadaDto } from './dto/create-ruta-parada.dto';
import { UpdateRutaParadaDto } from './dto/update-ruta-parada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RutaParada } from './entities/ruta-parada.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RutaParadaService {
  constructor(
    @InjectRepository(RutaParada)
    private readonly rutaParadaRepository: Repository<RutaParada>
  ) {}

  create(createRutaParadaDto: CreateRutaParadaDto) {
    const relation = this.rutaParadaRepository.create(createRutaParadaDto);

    return this.rutaParadaRepository.save(relation);
  }


}
