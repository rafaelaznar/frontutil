import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { IPage } from '../../../model/plist';
import { ICalinescu } from '../../../model/calinescu';
import { CalinescuService } from '../../../service/calinescu.service';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { DatetimePipe } from "../../../pipe/datetime-pipe";

@Component({
  selector: 'app-routed-admin-plist',
  imports: [RouterLink, Paginacion, BotoneraRpp, DatetimePipe, DecimalPipe],
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
  totalGlobal: number = 0;
  borrandoTodo: boolean = false;

  constructor(private oCalinescuService: CalinescuService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.obtenerPagina();
    this.cargarTotalGlobal();
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

  calcularTotal(): number {
    if (!this.oPage || !this.oPage.content) return 0;
    return this.oPage.content.reduce((sum, item) => sum + (item.precio || 0), 0);
  }

  cargarTotalGlobal() {
    this.oCalinescuService.getTotalPrecios().subscribe({
      next: (total: number) => {
        this.totalGlobal = total;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cargar total global:', error);
      },
    });
  }

  generarDatosFalsos() {
    this.rellenaOk = null;
    this.rellenaError = null;
    this.rellenando = true;
    this.oCalinescuService.rellenaListaCompra(this.rellenaCantidad).subscribe({
      next: (count: number) => {
        this.rellenando = false;
        this.rellenaOk = count;
        this.obtenerPagina();
        this.cargarTotalGlobal(); // Actualizar total después de generar datos
      },
      error: (err: HttpErrorResponse) => {
        this.rellenando = false;
        this.rellenaError = 'Error generando datos fake';
        console.error(err);
      }
    });
  }

  confirmarBorrarTodo() {
    this.borrandoTodo = true;
    this.rellenaError = null;
    this.oCalinescuService.deleteAll().subscribe({
      next: (count: number) => {
        this.borrandoTodo = false;
        this.rellenaOk = 0;
        this.obtenerPagina();
        this.cargarTotalGlobal();
      },
      error: (err: HttpErrorResponse) => {
        this.borrandoTodo = false;
        this.rellenaError = 'Error al borrar todos los elementos';
        console.error(err);
      }
    });
  }
}
