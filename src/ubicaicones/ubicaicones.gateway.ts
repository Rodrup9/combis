import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { UbicaiconesService } from './ubicaicones.service';
import { Server, Socket } from 'socket.io';

interface RecibirUbicacion {
  id: string;
  lat: number;
  lng: number;
}

@WebSocketGateway({cors: true, namespace: 'ubicaciones'})
export class UbicaiconesGateway  implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: Server;
  constructor(private readonly ubicaiconesService: UbicaiconesService) {}
  handleConnection(client: Socket) {
    this.ubicaiconesService.registerClient(client);  
    this.wss.emit('clients-updated', { clients: this.ubicaiconesService.getConnectedClients(), me: client.id });  
  }

  handleDisconnect(client: Socket) {
    this.ubicaiconesService.removeClient(client.id);
    this.wss.emit('clients-updated', { clients: this.ubicaiconesService.getConnectedClients(), me: client.id });  
  }

  @SubscribeMessage('recibirUbicacion')
  getUbication(@MessageBody() data: RecibirUbicacion) {
    this.ubicaiconesService.getUbication(data)
    this.wss.emit('updateLocation', this.ubicaiconesService.updateLocation());
  }
  @SubscribeMessage('updateLocation')
  updateLocation() {
    this.wss.emit('updateLocation', this.ubicaiconesService.updateLocation());
  }

  
}
