import { Module } from '@nestjs/common';
import { RutaService } from './ruta.service';
import { RutaController } from './ruta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ruta]),
  ],
  controllers: [RutaController],
  providers: [RutaService],
})
export class RutaModule {}
