import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { ISilvestre } from '../../../model/silvestre';
import { SilvestreService } from '../../../service/silvestre';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { DatetimePipe } from "../../../pipe/datetime-pipe";

@Component({
  selector: 'app-routed-admin-plist',
  imports: [RouterLink, Paginacion, BotoneraRpp, DatetimePipe],
  templateUrl: './routed-admin-plist.html',
  styleUrl: './routed-admin-plist.css',
})
export class RoutedAdminPlist {
  oPage: IPage<ISilvestre> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  rellenaCantidad: number = 10;
  rellenando: boolean = false;
  rellenaOk: number | null = null;
  rellenaError: string | null = null;
  publishingId: number | null = null;
  publishingAction: 'publicar' | 'despublicar' | null = null;

  constructor(private oSilvestreService: SilvestreService) { }

  oBotonera: string[] = [];
  orderField: string = 'id';
  orderDirection: string = 'asc';

  ngOnInit() {
    this.getPage();
  }

  getPage() {
  this.oSilvestreService.getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection).subscribe({
      next: (data: IPage<ISilvestre>) => {
        this.oPage = data;
        this.rellenaOk = this.oPage.totalElements;
        // si estamos en una página que supera el límite entonces nos situamos en la ultima disponible
        if (this.numPage > 0 && this.numPage >= data.totalPages) {
          this.numPage = data.totalPages - 1;
          this.getPage();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  onOrder(order: string) {
    if (this.orderField === order) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderField = order;
      this.orderDirection = 'asc';
    }
    this.numPage = 0;
    this.getPage();
    return false;
  }

  publicar(id: number) {
    this.publishingId = id;
    this.publishingAction = 'publicar';
    this.oSilvestreService.publicar(id).subscribe({
      next: () => {
        this.publishingId = null;
        this.publishingAction = null;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.publishingId = null;
        this.publishingAction = null;
      }
    });
    return false;
  }

  despublicar(id: number) {
    this.publishingId = id;
    this.publishingAction = 'despublicar';
    this.oSilvestreService.despublicar(id).subscribe({
      next: () => {
        this.publishingId = null;
        this.publishingAction = null;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.publishingId = null;
        this.publishingAction = null;
      }
    });
    return false;
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
    return false;
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.getPage();
    return false;
  }

  onCantidadChange(value: string) {
    this.rellenaCantidad = +value;
    return false;
  }

  generarFake() {
    this.rellenaOk = null;
    this.rellenaError = null;
    this.rellenando = true;
    this.oSilvestreService.rellenaSilvestre(this.rellenaCantidad).subscribe({
      next: (count: number) => {
        this.rellenando = false;
        this.rellenaOk = count;
        this.getPage(); // refrescamos listado
      },
      error: (err: HttpErrorResponse) => {
        this.rellenando = false;
        this.rellenaError = 'Error generando datos fake';
        console.error(err);
      }
    });
  }
}
