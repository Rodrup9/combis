import { Injectable } from '@nestjs/common';
import { CreateEstadoBusDto } from './dto/create-estado-bus.dto';
import { UpdateEstadoBusDto } from './dto/update-estado-bus.dto';

@Injectable()
export class EstadoBusService {
  create(createEstadoBusDto: CreateEstadoBusDto) {
    return 'This action adds a new estadoBus';
  }

  findAll() {
    return `This action returns all estadoBus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoBus`;
  }

  update(id: number, updateEstadoBusDto: UpdateEstadoBusDto) {
    return `This action updates a #${id} estadoBus`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoBus`;
  }
}
