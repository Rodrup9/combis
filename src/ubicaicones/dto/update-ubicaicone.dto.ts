import { PartialType } from '@nestjs/mapped-types';
import { CreateUbicaiconeDto } from './create-ubicaicone.dto';

export class UpdateUbicaiconeDto extends PartialType(CreateUbicaiconeDto) {
  id: number;
}
