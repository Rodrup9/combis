import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";

class Estaciones {
    @IsString()
    id: string;
    @IsInt()
    orden: number;
}

export class CreateRutaDto {

    @IsString()
    nombre: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    combis?: string[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Estaciones) 
    paradas?: Estaciones[];

}
