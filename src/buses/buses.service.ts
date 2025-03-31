import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/bus.entity';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Injectable()
export class BusesService {

  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>, 
  ) {}

  async create(createBusDto: CreateBusDto): Promise<Bus> {
    const bus = this.busRepository.create(createBusDto); 
    return this.busRepository.save(bus); 
  }


  async findAll(): Promise<Bus[]> {
    return this.busRepository.find(); 
  }


  async findOne(id: string): Promise<Bus> {
    const bus = await this.busRepository.findOne({ where: { id } });
    if (!bus) {
      throw new Error('Bus no encontrado');
    }
    return bus;
  }


  async update(id: string, updateBusDto: UpdateBusDto): Promise<Bus> {
    const bus = await this.findOne(id); 
    if (!bus) {
      throw new Error('Bus no encontrado');
    }


    const updatedBus = Object.assign(bus, updateBusDto); 
    return this.busRepository.save(updatedBus);
  }


  async remove(id: string): Promise<void> {
    const bus = await this.findOne(id); 
    if (!bus) {
      throw new Error('Bus no encontrado');
    }
    await this.busRepository.remove(bus); 
  }
}
