import { forwardRef, Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { RutaModule } from 'src/ruta/ruta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bus]),
    UsuariosModule,
    forwardRef(() => RutaModule)
  ],
  controllers: [BusesController],
  providers: [BusesService],
  exports: [BusesService]
})
export class BusesModule {}
