import { Bus } from "src/buses/entities/bus.entity";
import { Parada } from "src/paradas/entities/parada.entity";
import { OneToMany, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Entity } from 'typeorm';

@Entity()
export class Ruta {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @OneToMany(() => Bus, bus => bus.ruta, {eager: true})
    buses: Bus[];

    /*@ManyToMany(() => Parada)
    @JoinTable()
    paradas: Parada[]*/
}
