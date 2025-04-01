import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/bus.entity';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RutaService } from 'src/ruta/ruta.service';

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
  
    return await this.busRepository.save(bus);

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



  async update(id: string, updateBusDto: UpdateBusDto): Promise<Bus> {
    const bus = await this.findOne(id); 
    if (!bus) {
      throw new Error('Bus no encontrado');
    }


    const updatedBus = Object.assign(bus, updateBusDto); 
    return this.busRepository.save(updatedBus);
  }


  async remove(id: string): Promise<void> {
    const bus = await this.findOne(id); 
    if (!bus) {
      throw new Error('Bus no encontrado');
    }
    await this.busRepository.remove(bus); 
  }

  async findAllByRoute(rutaId: string): Promise<Bus[]> {
    return this.busRepository.find({
      where: { ruta: { id: rutaId } }, // Busca buses donde la ruta tenga el ID dado
      relations: ['ruta'], // Traer la relación con la ruta
    });
  }
}
