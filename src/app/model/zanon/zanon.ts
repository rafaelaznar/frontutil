export interface IZanon {
    id: number
    titulo: string
    contenido: string
    etiquetas: string
    fechaCreacion: string
    fechaModificacion: any

    publico: boolean
    categoria: string
    duracion: number
    dificultad: 'baja' | 'media' | 'alta'
    imagen: string
}