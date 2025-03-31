import { PartialType } from '@nestjs/mapped-types';
import { CreateRutaParadaDto } from './create-ruta-parada.dto';

export class UpdateRutaParadaDto extends PartialType(CreateRutaParadaDto) {}
