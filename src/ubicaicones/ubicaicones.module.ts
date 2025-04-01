import { Module } from '@nestjs/common';
import { UbicaiconesService } from './ubicaicones.service';
import { UbicaiconesGateway } from './ubicaicones.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicaicones } from './entities/ubicaicone.entity';
import { RutaModule } from 'src/ruta/ruta.module';
import { BusesModule } from 'src/buses/buses.module';

@Module({
  providers: [UbicaiconesGateway, UbicaiconesService],
  imports:[
    TypeOrmModule.forFeature([Ubicaicones]),
    RutaModule,
    BusesModule
  ]
})
export class UbicaiconesModule {}
