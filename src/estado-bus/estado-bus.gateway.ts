import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { EstadoBusService } from './estado-bus.service';
import { CreateEstadoBusDto } from './dto/create-estado-bus.dto';
import { UpdateEstadoBusDto } from './dto/update-estado-bus.dto';

@WebSocketGateway()
export class EstadoBusGateway {
  constructor(private readonly estadoBusService: EstadoBusService) {}

  @SubscribeMessage('createEstadoBus')
  create(@MessageBody() createEstadoBusDto: CreateEstadoBusDto) {
    return this.estadoBusService.create(createEstadoBusDto);
  }

  @SubscribeMessage('findAllEstadoBus')
  findAll() {
    return this.estadoBusService.findAll();
  }

  @SubscribeMessage('findOneEstadoBus')
  findOne(@MessageBody() id: number) {
    return this.estadoBusService.findOne(id);
  }

  @SubscribeMessage('updateEstadoBus')
  update(@MessageBody() updateEstadoBusDto: UpdateEstadoBusDto) {
    return this.estadoBusService.update(updateEstadoBusDto.id, updateEstadoBusDto);
  }

  @SubscribeMessage('removeEstadoBus')
  remove(@MessageBody() id: number) {
    return this.estadoBusService.remove(id);
  }
}
