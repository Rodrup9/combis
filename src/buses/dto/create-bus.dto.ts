import { IsString } from "class-validator";

export class CreateBusDto {
    
    @IsString()
    numero: string;

    @IsString()
    matricula: string;

    @IsString()
    rutaId?: string;

    @IsString()
    operadorId?: string;

    @IsString()
    ownerId: string;

}
