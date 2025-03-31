import { IsBoolean, IsIn, IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    nombre: string;

    @IsString()
    apellido_paterno: string;

    @IsString()
    @IsOptional()
    apellido_materno?: string;

    @IsBoolean()
    sexo: boolean;

    @IsString()
    fecha_nacimiento: string;

    @IsString()
    @IsOptional()
    curp?: string;

    @IsString()
    @IsOptional()
    rfc?: string;

    @IsString()
    correo_electronico: string;

    @IsString()
    clave: string;

    @IsIn(['checador', 'chofer', 'dueño'])
    rol: string;

}
