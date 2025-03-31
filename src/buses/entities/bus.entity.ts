import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ubicaicones } from 'src/ubicaicones/entities/ubicaicone.entity';

@Entity()
export class Bus {

    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  nombre: string;

  @Column('varchar', { length: 255 })
  ruta: string;

  @OneToMany(() => Ubicaicones, (ubicaicones) => ubicaicones.bus)
  ubicaicones: Ubicaicones[];

}
