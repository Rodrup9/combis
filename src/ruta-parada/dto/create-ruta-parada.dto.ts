import { Parada } from "src/paradas/entities/parada.entity";
import { Ruta } from "src/ruta/entities/ruta.entity";

export class CreateRutaParadaDto {

    orden: number;

    ruta: Ruta;

    parada: Parada;

}
