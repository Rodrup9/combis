import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateParadaDto {
  
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  latitud: number;

  @IsNotEmpty()
  @IsNumber()
  longitud: number;

  @IsOptional()
  @IsString()
  descripcion?: string;
}