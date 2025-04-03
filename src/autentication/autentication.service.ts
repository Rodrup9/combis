import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginDto } from './dto/login-autentication.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';


@Injectable()
export class AutenticationService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const usuario: Usuario = await this.usuariosService.findByEmail(loginDto.correo_electronico);
    
    if (!usuario) {
      throw new NotFoundException(`Usuario con correo ${loginDto.correo_electronico} no encontrado`);
    }
  
    const isPasswordValid = await bcrypt.compare(loginDto.clave, usuario.clave);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    const payload = { id: usuario.id, correo: usuario.correo_electronico };
    const token = this.jwtService.sign(payload);

    return { access_token: token, usuario: usuario.nombre };  
  }

  
}
