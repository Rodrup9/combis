import { Ruta } from "src/ruta/entities/ruta.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bus {

    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  nombre: string;

    @ManyToOne(() => Ruta, ruta => ruta.buses, { nullable: true })
    ruta: Ruta;

    @OneToOne(() => Usuario, { nullable: true })
    @JoinColumn()
    operador: Usuario;

    @OneToOne(() => Usuario, { nullable: true })
    @JoinColumn()
    owner: Usuario

    @Column('text')
    matricula: string;

}
