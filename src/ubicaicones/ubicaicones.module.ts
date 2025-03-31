import { Module } from '@nestjs/common';
import { UbicaiconesService } from './ubicaicones.service';
import { UbicaiconesGateway } from './ubicaicones.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicaicones } from './entities/ubicaicone.entity';

@Module({
  providers: [UbicaiconesGateway, UbicaiconesService],
  imports:[TypeOrmModule.forFeature([Ubicaicones])]
})
export class UbicaiconesModule {}
