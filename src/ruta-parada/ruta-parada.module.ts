import { Module } from '@nestjs/common';
import { RutaParadaService } from './ruta-parada.service';
import { RutaParadaController } from './ruta-parada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutaParada } from './entities/ruta-parada.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RutaParada]),
  ],
  controllers: [RutaParadaController],
  providers: [RutaParadaService],
  exports: [RutaParadaService]
})
export class RutaParadaModule {}
