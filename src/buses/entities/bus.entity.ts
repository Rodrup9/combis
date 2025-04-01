import { Ruta } from "src/ruta/entities/ruta.entity";
import { Ubicaicones } from "src/ubicaicones/entities/ubicaicone.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bus {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    numero: string;

    @ManyToOne(() => Ruta, ruta => ruta.buses, { nullable: true })
    ruta: Ruta;

    @ManyToOne(() => Usuario, usuario => usuario.busesOperator, { nullable: true })
    @JoinColumn()
    operador: Usuario;

    @ManyToOne(() => Usuario, usuario => usuario.busesOwners, { nullable: true })
    @JoinColumn()
    owner: Usuario;

    @Column('text')
    matricula: string;

    @OneToMany(() => Ubicaicones, ubicaciones => ubicaciones.bus, { eager: true })
    ubicaciones: Ubicaicones[]
}
