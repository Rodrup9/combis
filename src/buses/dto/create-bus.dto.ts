import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBusDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  ruta: string;
}
