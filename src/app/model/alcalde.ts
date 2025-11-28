export interface IAlcalde {
  id: number
  titulo: string
  autor: string
  genero: string
  resena: string
  valoracion: number
  publicado: boolean
  destacado: boolean
  fechaLectura: string
  fechaCreacion: string
  fechaModificacion: string | null
}
