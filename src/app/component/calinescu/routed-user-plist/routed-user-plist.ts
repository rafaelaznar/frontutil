import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IPage } from '../../../model/plist';
import { ICalinescu } from '../../../model/calinescu';
import { CalinescuService } from '../../../service/calinescu.service';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { UnroutedUserView2Calinescu } from "../unrouted-user-view2/unrouted-user-view2";


@Component({
  selector: 'app-routed-user-plist-calinescu',
  imports: [Paginacion, UnroutedUserView2Calinescu],
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
})
export class RoutedUserPlistCalinescu {
  oPage: IPage<ICalinescu> | null = null;
  numPage: number = 0;
  numRpp: number = 2;

  constructor(private oCalinescuService: CalinescuService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.obtenerPagina();
  }

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

  irAPagina(numPage: number) {
    this.numPage = numPage;
    this.obtenerPagina();
    return false;
  }

  cambiarRpp(n: number) {
    this.numRpp = n;
    this.obtenerPagina();
    return false;
  }
}
