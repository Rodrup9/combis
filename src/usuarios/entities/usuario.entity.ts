import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: true,
    })
    nombre: string;

    @Column('text', {
        nullable: true,
    })
    apellido_paterno: string;

    @Column('text',  {
        nullable: true,
    })
    apellido_materno: string;

    @Column('boolean')
    sexo: boolean;

    @Column('text',)
    fecha_nacimiento: string;

    @Column('text',  {
        nullable: true,
    })
    curp: string;

    @Column('text',  {
        nullable: true,
    })
    rfc: string;

    @Column('text')
    correo_electronico: string;

    @Column('text')
    clave: string;

    @Column('text')
    rol: string;

}
