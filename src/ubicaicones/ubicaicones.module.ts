import { Module } from '@nestjs/common';
import { UbicaiconesService } from './ubicaicones.service';
import { UbicaiconesGateway } from './ubicaicones.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicaicones } from './entities/ubicaicone.entity';
import { RutaModule } from 'src/ruta/ruta.module';
import { BusesModule } from 'src/buses/buses.module';
import { ParadasModule } from 'src/paradas/paradas.module';
import { Checador } from './entities/checador.entity';

@Module({
  providers: [UbicaiconesGateway, UbicaiconesService],
  imports:[
    TypeOrmModule.forFeature([Ubicaicones, Checador]),
    RutaModule,
    BusesModule,
    ParadasModule
  ]
})
export class UbicaiconesModule {}
