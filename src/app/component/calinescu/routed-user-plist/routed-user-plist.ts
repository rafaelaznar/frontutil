import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IPage } from '../../../model/plist';
import { ICalinescu } from '../../../model/calinescu';
import { CalinescuService } from '../../../service/calinescu.service';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { UnroutedUserView2Calinescu } from "../unrouted-user-view2/unrouted-user-view2";

/**
 * Componente para mostrar el listado paginado de items de la lista de compras (vista usuario).
 * 
 * Proporciona una vista pública de los items, con:
 * - Listado paginado de items publicados
 * - Ordenamiento descendente por ID
 * - Visualización en formato tarjeta
 * - Control de paginación
 */
@Component({
  selector: 'app-routed-user-plist-calinescu',
  imports: [Paginacion, UnroutedUserView2Calinescu],
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
})
export class RoutedUserPlistCalinescu {
  /** Objeto de página con los items y metadatos de paginación */
  oPage: IPage<ICalinescu> | null = null;
  
  /** Número de página actual (base 0) */
  numPage: number = 0;
  
  /** Cantidad de registros por página (fijo en 2 para vista de usuario) */
  numRpp: number = 2;

  constructor(private oCalinescuService: CalinescuService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.obtenerPagina();
  }

  /**
   * Obtiene la página actual de items desde el servidor.
   * Los items se ordenan por ID descendente para mostrar los más recientes primero.
   */
  obtenerPagina() {
    this.oCalinescuService.getPage(this.numPage, this.numRpp, 'id', 'desc').subscribe({
      next: (data: IPage<ICalinescu>) => {
        this.oPage = data;
        console.log('Datos recibidos:', data); // Para debug
        if (this.numPage > 0 && this.numPage >= data.totalPages) {
          this.numPage = data.totalPages - 1;
          this.obtenerPagina();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cargar datos:', error);
      },
    });
  }

  /**
   * Navega a una página específica del listado.
   * 
   * @param numPage - Número de página a mostrar
   * @returns false para prevenir comportamiento por defecto del evento
   */
  irAPagina(numPage: number) {
    this.numPage = numPage;
    this.obtenerPagina();
    return false;
  }

  /**
   * Cambia la cantidad de registros mostrados por página.
   * 
   * @param n - Nueva cantidad de registros por página
   * @returns false para prevenir comportamiento por defecto del evento
   */
  cambiarRpp(n: number) {
    this.numRpp = n;
    this.obtenerPagina();
    return false;
  }
}
