import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AutenticationService } from './autentication.service';
import { LoginDto } from './dto/login-autentication.dto';
import { Response } from 'express';

@Controller('autentication')
export class AutenticationController {
  constructor(private readonly autenticationService: AutenticationService) {}

  @Post('login')
  async login(@Body() loginUsuarioDto: LoginDto) {        
    const usuario = await this.autenticationService.login(loginUsuarioDto);    
    // res.cookie('access_token', usuario.access_token, {
    //   httpOnly: true,
    //   secure: true/*process.env.NODE_ENV === 'production'*/,
    //   sameSite: 'none',
    //   maxAge: 60 * 60 * 1000,
    // });
    return { message: 'Autenticado con éxito', usuario: usuario.usuario, access_token: usuario.access_token };
  }


}
