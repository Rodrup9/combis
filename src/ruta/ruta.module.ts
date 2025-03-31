import { Module } from '@nestjs/common';
import { RutaService } from './ruta.service';
import { RutaController } from './ruta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { BusesModule } from 'src/buses/buses.module';
import { ParadasModule } from 'src/paradas/paradas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ruta]),
    BusesModule,
    ParadasModule,
  ],
  controllers: [RutaController],
  providers: [RutaService],
})
export class RutaModule {}
