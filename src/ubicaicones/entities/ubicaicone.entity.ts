import { Column, Entity, PrimaryGeneratedColumn,  ManyToOne, JoinColumn  } from "typeorm";
import { Bus } from "src/buses/entities/bus.entity";

@Entity()
export class Ubicaicones {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 6 })
  latitud: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitud: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  velocidad: number;

  @Column('varchar', { length: 255, nullable: true })
  direccion: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  actualizado_en: Date;

  @ManyToOne(() => Bus, (buses) => buses.ubicaicones) // Cuando tengas la entidad de Buses
  @JoinColumn({ name: 'bus_id' }) // Relaciona el campo 'bus_id' con la tabla de buses
  bus: Bus; // Relaciona esta entidad con la tabla de buses
}