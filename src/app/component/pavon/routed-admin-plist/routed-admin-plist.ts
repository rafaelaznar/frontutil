import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { IRecurso } from '../../../model/pavon/recurso';
import { PavonService } from '../../../service/pavon/recurso';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { DatetimePipe } from "../../../pipe/datetime-pipe";

@Component({
  selector: 'app-routed-admin-plist',
  imports: [RouterLink, Paginacion, BotoneraRpp, DatetimePipe],
  templateUrl: './routed-admin-plist.html',
  styleUrl: './routed-admin-plist.css',
})
export class RoutedAdminPlistPavon {
  oPage: IPage<IRecurso> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  rellenaCantidad: number = 10;
  rellenando: boolean = false;
  rellenaOk: number | null = null;
  rellenaError: string | null = null;
  publishingId: number | null = null;
  publishingAction: 'publicar' | 'despublicar' | null = null;
  sortField: string = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Mensajes y total
  message: string | null = null;
  totalRecords: number = 0;
  private messageTimeout: any = null;

  constructor(private oPavonService: PavonService, private route: ActivatedRoute) { }

  oBotonera: string[] = [];
  orderField: string = 'id';
  orderDirection: string = 'asc';

  ngOnInit() {
    const msg = this.route.snapshot.queryParamMap.get('msg');
    if (msg) {
      this.showMessage(msg);
    }
    this.getPage();
  }

  private showMessage(msg: string, duration: number = 4000) {
    this.message = msg;
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    this.messageTimeout = setTimeout(() => {
      this.message = null;
      this.messageTimeout = null;
    }, duration);
  }

  getPage() {
    this.oPavonService.getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection).subscribe({
      next: (data: IPage<IRecurso>) => {
        this.oPage = data;
        this.totalRecords = data?.totalElements ?? 0;
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

  sortBy(field: string) {
    if (this.sortField === field) {
      // toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.getPage();
    return false;
  }

  generarFake() {
    this.rellenaOk = null;
    this.rellenaError = null;
    this.rellenando = true;
    this.oPavonService.rellenaRecurso(this.rellenaCantidad).subscribe({
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

  publicar(id: number) {
    this.publishingId = id;
    this.publishingAction = 'publicar';
    this.oPavonService.publicar(id).subscribe({
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
    this.oPavonService.despublicar(id).subscribe({
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
}
