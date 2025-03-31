import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoBusDto } from './create-estado-bus.dto';

export class UpdateEstadoBusDto extends PartialType(CreateEstadoBusDto) {
  id: number;
}
