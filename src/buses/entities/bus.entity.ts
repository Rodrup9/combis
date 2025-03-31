import { Ruta } from "src/ruta/entities/ruta.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bus {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    numero: string;

    @ManyToOne(() => Ruta, ruta => ruta.buses)
    ruta: Ruta;

    @OneToOne(() => Usuario)
    @JoinColumn()
    operador: Usuario;

}
