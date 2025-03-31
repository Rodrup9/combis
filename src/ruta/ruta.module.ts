import { forwardRef, Module } from '@nestjs/common';
import { RutaService } from './ruta.service';
import { RutaController } from './ruta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { BusesModule } from 'src/buses/buses.module';
import { ParadasModule } from 'src/paradas/paradas.module';
import { RutaParadaModule } from 'src/ruta-parada/ruta-parada.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ruta]),
    forwardRef(() => BusesModule),
    ParadasModule,
    RutaParadaModule,
  ],
  controllers: [RutaController],
  providers: [RutaService],
  exports: [RutaService]
})
export class RutaModule {}
