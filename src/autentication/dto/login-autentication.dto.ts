import { IsString } from "class-validator";

export class LoginDto {

    @IsString()
    correo_electronico: string;

    @IsString()
    clave: string;

}
