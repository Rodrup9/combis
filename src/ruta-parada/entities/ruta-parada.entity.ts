import { Parada } from 'src/paradas/entities/parada.entity';
import { Ruta } from 'src/ruta/entities/ruta.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class RutaParada {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    orden: number;

    @ManyToOne(() => Ruta, ruta => ruta.rutaParadas)
    ruta: Ruta;

    @ManyToOne(() => Parada, parada => parada.rutaParadas)
    parada: Parada;
}
