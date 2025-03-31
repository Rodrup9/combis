import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    

    
}
