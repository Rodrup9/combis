import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { Repository } from 'typeorm';
import { RutaService } from 'src/ruta/ruta.service';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class BusesService {

  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
    @Inject(forwardRef(() => RutaService))
    private readonly rutaService: RutaService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createBusDto: CreateBusDto) {
    const { rutaId, operadorId, ownerId, ...rest } = createBusDto;
  
    // Buscar los valores relacionados, pero solo si los IDs están definidos
    const operador = operadorId ? await this.usuariosService.findOne(operadorId) : null;
    const owner = ownerId ? await this.usuariosService.findOne(ownerId) : null;
    const ruta = rutaId ? await this.rutaService.findOne(rutaId) : null;
  
    // Crear el objeto Bus de manera segura
    const bus = this.busRepository.create({
      ...rest,
      operador,
      owner,
      ruta
    });    
  
    try {
      return await this.busRepository.save(bus);
    } catch (error) {
      throw new BadRequestException('Error al guardar el bus: ' + error.message);
    }
  }

  findAll() {
    return this.busRepository.find();
  }

  async findOne(id: string) {
    const bus = await this.busRepository.findOneBy({id});

    if (!bus)
      throw new BadRequestException(`Combi no encontrado con ${id}`);
    return bus;
  }

  update(id: number, updateBusDto: UpdateBusDto) {
    return `This action updates a #${id} bus`;
  }

  remove(id: number) {
    return `This action removes a #${id} bus`;
  }
}
