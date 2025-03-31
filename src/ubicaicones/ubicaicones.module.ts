import { Module } from '@nestjs/common';
import { UbicaiconesService } from './ubicaicones.service';
import { UbicaiconesGateway } from './ubicaicones.gateway';

@Module({
  providers: [UbicaiconesGateway, UbicaiconesService],
})
export class UbicaiconesModule {}
