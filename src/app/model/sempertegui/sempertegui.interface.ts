// Define la estructura de los datos de una película.
export interface IPelicula {
  id: number;
  titulo: string;
  genero: string;
  sinopsis: string;
  director: string;
  puntuacion: number;
  anyo: number;
  publicado: boolean;
  fechaCreacion: string;
  fechaModificacion: any;
}