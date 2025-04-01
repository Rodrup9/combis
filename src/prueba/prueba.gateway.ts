import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { PruebaService } from './prueba.service';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';

@WebSocketGateway()
export class PruebaGateway {
  constructor(private readonly pruebaService: PruebaService) {}

  @SubscribeMessage('createPrueba')
  create(@MessageBody() createPruebaDto: CreatePruebaDto) {
    return this.pruebaService.create(createPruebaDto);
  }

  @SubscribeMessage('findAllPrueba')
  findAll() {
    return this.pruebaService.findAll();
  }

  @SubscribeMessage('findOnePrueba')
  findOne(@MessageBody() id: number) {
    return this.pruebaService.findOne(id);
  }

  @SubscribeMessage('updatePrueba')
  update(@MessageBody() updatePruebaDto: UpdatePruebaDto) {
    return this.pruebaService.update(updatePruebaDto.id, updatePruebaDto);
  }

  @SubscribeMessage('removePrueba')
  remove(@MessageBody() id: number) {
    return this.pruebaService.remove(id);
  }
}
