import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParadaDto } from './dto/create-parada.dto';
import { UpdateParadaDto } from './dto/update-parada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parada } from './entities/parada.entity';

@Injectable()
export class ParadasService {
  constructor(
  @InjectRepository(Parada)
    private readonly paradaRepository: Repository<Parada>,
  ) {}

  async create(createParadaDto: CreateParadaDto): Promise<Parada> {
    const nuevaParada = this.paradaRepository.create(createParadaDto);
    return await this.paradaRepository.save(nuevaParada);
  }

  // Obtener todas las paradas
  async findAll(): Promise<Parada[]> {
    return await this.paradaRepository.find();
  }

  // Obtener una parada por ID
  async findOne(id: string): Promise<Parada> {
    const parada = await this.paradaRepository.findOne({ where: { id } });
    if (!parada) {
      throw new NotFoundException(`Parada con ID ${id} no encontrada`);
    }
    return parada;
  }

  // Actualizar una parada
  async update(id: string, updateParadaDto: UpdateParadaDto): Promise<Parada> {
    const parada = await this.findOne(id); 
    Object.assign(parada, updateParadaDto);
    return await this.paradaRepository.save(parada);
  }

  // Eliminar una parada
  async remove(id: string): Promise<void> {
    const parada = await this.findOne(id);
    await this.paradaRepository.remove(parada);
  }
}
