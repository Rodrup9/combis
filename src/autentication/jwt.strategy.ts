import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usuarioService: UsuariosService,
  ) {    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      /*jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        // console.log(request.cookies);
        
        // return request?.cookies?.access_token;
        // return request?.body?.access_token;
      }]),   */ 
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_JWT_SECRET,
    });

  }

  async validate(payload: any) {    
    const usuario = this.usuarioService.findOne(payload.id);
    if (!usuario) {
      throw new UnauthorizedException('Token inválido');
    }
    return usuario;
  }
}
