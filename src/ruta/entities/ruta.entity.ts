import { Bus } from "src/buses/entities/bus.entity";
import { Parada } from "src/paradas/entities/parada.entity";
import { RutaParada } from "src/ruta-parada/entities/ruta-parada.entity";
import { OneToMany, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Ruta {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @OneToMany(() => Bus, bus => bus.ruta, {eager: true})
    buses: Bus[];

    @OneToMany(() => RutaParada, rutaParada => rutaParada.ruta, { eager: true })
    rutaParadas: RutaParada[];
}
