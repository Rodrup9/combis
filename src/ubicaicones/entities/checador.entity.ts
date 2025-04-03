import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Bus } from 'src/buses/entities/bus.entity';
import { Ruta } from 'src/ruta/entities/ruta.entity';
import { Parada } from 'src/paradas/entities/parada.entity';

@Entity()
export class Checador {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Parada)
    parada: Parada;

    @ManyToOne(() => Bus)
    bus: Bus;

    @ManyToOne(() => Ruta)
    ruta: Ruta;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_hora: Date;
}
