import { Injectable } from '@nestjs/common';
import { CreateUbicaiconeDto } from './dto/create-ubicaicone.dto';
import { UpdateUbicaiconeDto } from './dto/update-ubicaicone.dto';
import { Socket } from 'socket.io';

interface ConnectedClients {
  [id: string] : Socket
}

interface Ubications {
  id: string;
  lat: number;
  lng: number;
}

@Injectable()
export class UbicaiconesService {
  private connectedClients: ConnectedClients = {};

  private ubicationsSave: Ubications[] = []

  registerClient(client: Socket) {
    this.connectedClients[client.id] = client;    
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  getUbication(ubications: Ubications) {
    const ubi = this.ubicationsSave.filter(u => u.id !== ubications.id);

    this.ubicationsSave = [...ubi, ubications];
  }

  updateLocation() {
    return this.ubicationsSave;
  }
} 
