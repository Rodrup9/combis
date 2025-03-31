import { RutaParada } from "src/ruta-parada/entities/ruta-parada.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Parada {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',)
    nombre: string;

    @Column('decimal', { precision: 10, scale: 6 })
    latitud: number;

    @Column('decimal', { precision: 10, scale: 6 })
    longitud: number;

    @OneToMany(() => RutaParada, rutaParada => rutaParada.parada, { eager: true })
    rutaParadas: RutaParada[];

}
