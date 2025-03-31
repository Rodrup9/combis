import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RutaParadaService } from './ruta-parada.service';
import { CreateRutaParadaDto } from './dto/create-ruta-parada.dto';
import { UpdateRutaParadaDto } from './dto/update-ruta-parada.dto';

@Controller('ruta-parada')
export class RutaParadaController {
  constructor(private readonly rutaParadaService: RutaParadaService) {}
}
