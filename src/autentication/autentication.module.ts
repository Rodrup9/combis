import { Module } from '@nestjs/common';
import { AutenticationService } from './autentication.service';
import { AutenticationController } from './autentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsuariosModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1h'}
    })
  ],
  controllers: [AutenticationController],
  providers: [AutenticationService],
})
export class AutenticationModule {}
