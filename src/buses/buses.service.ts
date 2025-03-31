import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusesService {

  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>
  ) {}

  create(createBusDto: CreateBusDto) {
    return 'This action adds a new bus';
  }

  findAll() {
    return `This action returns all buses`;
  }

  async findOne(id: string) {
    const bus = await this.busRepository.findOneBy({id});

    if (!bus)
      throw new BadRequestException(`Combi no encontrado con ${id}`);
    return bus;
  }

  update(id: number, updateBusDto: UpdateBusDto) {
    return `This action updates a #${id} bus`;
  }

  remove(id: number) {
    return `This action removes a #${id} bus`;
  }
}
