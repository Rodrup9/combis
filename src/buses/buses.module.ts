import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';

@Module({
  controllers: [BusesController],
  providers: [BusesService],
  imports:[TypeOrmModule.forFeature([Bus])],
})
export class BusesModule {}
