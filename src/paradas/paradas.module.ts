import { Module } from '@nestjs/common';
import { ParadasService } from './paradas.service';
import { ParadasController } from './paradas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parada } from './entities/parada.entity';

@Module({
  controllers: [ParadasController],
  providers: [ParadasService],
  imports:[TypeOrmModule.forFeature([Parada])],
  exports: [ParadasService]
})
export class ParadasModule {}
