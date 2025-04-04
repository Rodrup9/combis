import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ParadasModule } from './paradas/paradas.module';
import { BusesModule } from './buses/buses.module';
import { UbicaiconesModule } from './ubicaicones/ubicaicones.module';
import { EstadoBusModule } from './estado-bus/estado-bus.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutenticationModule } from './autentication/autentication.module';
import { RutaModule } from './ruta/ruta.module';
import { RutaParadaModule } from './ruta-parada/ruta-parada.module';
import { PruebaModule } from './prueba/prueba.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // En produccion false
    }),
    UsuariosModule, 
    ParadasModule, 
    BusesModule, 
    UbicaiconesModule, 
    EstadoBusModule, AutenticationModule, RutaModule, RutaParadaModule, PruebaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
