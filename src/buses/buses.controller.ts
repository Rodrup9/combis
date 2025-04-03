import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post('asignarconductor/:id')
  asignarConductor(@Param('id') id: string, @Body('usuarioId') usuarioId: string) {
    return this.busesService.asignarConductor(id, usuarioId);
  }

  @Post()
  create(@Body() createBusDto: CreateBusDto) {
    return this.busesService.create(createBusDto);
  }

  @Get('busByRoute/:id')
  findAllByRoute(@Param('id') id: string) {
    return this.busesService.findAllByRoute(id);
  }

  @Get()
  findAll() {
    return this.busesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { ruta: { rutaParadas, ...ruta  }, ...bus } = await this.busesService.findOne(id);

    return {
      ...bus,
      ruta: {
        ...ruta,
        paradas: rutaParadas.map(({orden, parada: { rutaParadas, ...parada }}) => {
          return { ...parada, orden };
        }),
      }
    }
  }


}
