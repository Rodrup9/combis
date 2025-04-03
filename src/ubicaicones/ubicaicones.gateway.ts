import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { UbicaiconesService } from './ubicaicones.service';
import { Server, Socket } from 'socket.io';
import { Param, ParseUUIDPipe } from '@nestjs/common';

interface RecibirUbicacion {
  id: string;
  lat: number;
  lng: number;
  rutaId: string;
  busId: string;
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
  async getUbication(@MessageBody() data: RecibirUbicacion) {
    await this.ubicaiconesService.saveUbication(data);
    const time = await this.ubicaiconesService.checkNearbyParada(data.busId, data.rutaId, data.lat, data.lng);

    const locations = await this.ubicaiconesService.getLocationsByRoute(data.rutaId);
    this.wss.emit('parada-llegada', {time});
    this.wss.to(data.rutaId).emit('routeLocations', locations);
    console.log(`Emitido a la sala ${data.rutaId} con ubicaciones actualizadas.`);
    //this.wss.to(data.rutaId).emit('updateLocation', this.ubicaiconesService.updateLocation());
  }
  @SubscribeMessage('updateLocation')
  updateLocation() {
    this.wss.emit('updateLocation', this.ubicaiconesService.updateLocation());
  }

  @SubscribeMessage('joinRoute')
  joinRoute(client: Socket, rutaId: string) {
    client.join(rutaId);
    console.log(`Cliente ${client.id} se unió a la sala ruta/${rutaId}`);
    client.emit('joinRoute', `Te has unido a la sala ${rutaId}`);
  }

  @SubscribeMessage('getRouteLocations')
  async getRouteLocations(client: Socket, @MessageBody('rutaId', new ParseUUIDPipe()) rutaId: string) {
    const locations = await this.ubicaiconesService.getLocationsByRoute(rutaId);
    client.emit('routeLocations', locations);
  }
  
}
