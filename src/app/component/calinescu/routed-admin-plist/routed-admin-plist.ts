import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { ICalinescu } from '../../../model/calinescu';
import { CalinescuService } from '../../../service/calinescu.service';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { DatetimePipe } from "../../../pipe/datetime-pipe";

@Component({
  selector: 'app-routed-admin-plist',
  imports: [RouterLink, Paginacion, BotoneraRpp, DatetimePipe],
  templateUrl: './routed-admin-plist.html',
  styleUrl: './routed-admin-plist.css',
})
export class RoutedAdminPlistCalinescu {
  oPage: IPage<ICalinescu> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  rellenaCantidad: number = 10;
  rellenando: boolean = false;
  rellenaOk: number | null = null;
  rellenaError: string | null = null;

  constructor(private oCalinescuService: CalinescuService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.obtenerPagina();
  }

  obtenerPagina() {
    this.oCalinescuService.getPage(this.numPage, this.numRpp).subscribe({
      next: (data: IPage<ICalinescu>) => {
        this.oPage = data;
        this.rellenaOk = this.oPage.totalElements;
        // si estamos en una página que supera el límite entonces nos situamos en la ultima disponible
        if (this.numPage > 0 && this.numPage >= data.totalPages) {
          this.numPage = data.totalPages - 1;
          this.obtenerPagina();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
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

  cambiarCantidad(value: string) {
    this.rellenaCantidad = +value;
    return false;
  }

  generarDatosFalsos() {
    this.rellenaOk = null;
    this.rellenaError = null;
    this.rellenando = true;
    this.oCalinescuService.rellenaListaCompra(this.rellenaCantidad).subscribe({
      next: (count: number) => {
        this.rellenando = false;
        this.rellenaOk = count;
        this.obtenerPagina(); // refrescamos listado
      },
      error: (err: HttpErrorResponse) => {
        this.rellenando = false;
        this.rellenaError = 'Error generando datos fake';
        console.error(err);
      }
    });
  }
}
