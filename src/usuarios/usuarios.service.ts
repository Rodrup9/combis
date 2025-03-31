import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const salt: string = await bcrypt.genSalt(+process.env.SALT);
    const hashedPassword: string = await bcrypt.hash(createUsuarioDto.clave, salt);
  
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      clave: hashedPassword,
    });

    return this.usuarioRepository.save(usuario);
  }

  async findByEmail(correo: string) {
    return this.usuarioRepository.findOneBy({correo_electronico: correo});
  } 

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usuarioRepository.findOneBy({id});

    if (!user)
      throw new BadRequestException('User not found');

    return user;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
