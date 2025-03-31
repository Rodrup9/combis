import { Module } from '@nestjs/common';
import { EstadoBusService } from './estado-bus.service';
import { EstadoBusGateway } from './estado-bus.gateway';

@Module({
  providers: [EstadoBusGateway, EstadoBusService],
})
export class EstadoBusModule {}
