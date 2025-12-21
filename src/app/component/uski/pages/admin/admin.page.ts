import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VisitasService } from '../../services/visitas.service';
import { Paginacion } from '../../../shared/paginacion/paginacion';
import { IPage } from '../../types/pageView';
import { IVisita } from '../../types/visitas';
import { RouterLink } from "@angular/router";
import { RegistroTablaComponent } from '../../components/registro-tabla-private/registro-tabla-private.component';
import { BotoneraRpp } from "../../../shared/botonera-rpp/botonera-rpp";
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDeleteDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin.page',
  imports: [
    CommonModule,
    RouterLink,
    Paginacion,
    RegistroTablaComponent,
    BotoneraRpp,
    MatIconModule
  ],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.css',
})
export class UskiAdminPage {
  oPage: IPage<IVisita> | null = null;
  numPage: number = 0;
  numRpp: number = 10;
  rellenaCantidad: number = 5;
  rellenando: boolean = false;
  deletingAll: boolean = false;
  rellenaOk: number | null = null;
  deleteAllOk: number | null = null;
  rellenaError: string | null = null;
  deleteAllError: string | null = null;
  column: string = 'fechaCreacion';
  direction: 'asc' | 'desc' = 'desc';

  constructor(
    private oVisitasService: VisitasService,
    private dialog: MatDialog,
  ) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oVisitasService.getPageAdmin(this.numPage, this.numRpp, this.column, this.direction).subscribe({
      next: (data: IPage<IVisita>) => {
        this.oPage = data;
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

  setSortColumn(column: string) {
    this.column = column;
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.getPage()
    return false;
  }

  generarFake() {
    this.rellenaOk = null;
    this.deleteAllOk = null;
    this.rellenaError = null;
    this.deleteAllError = null;
    this.rellenando = true;
    this.oVisitasService.rellenaBlog(this.rellenaCantidad).subscribe({
      next: (count: number) => {
        this.rellenando = false;
        this.rellenaOk = count;
        this.getPage(); // refrescamos listado
      },
      error: (err: HttpErrorResponse) => {
        this.rellenando = false;
        this.rellenaError = 'Error generando datos';
        console.error(err);
      }
    });
  }

  deleteAll() {
    this.deleteAllOk = null;
    this.rellenaOk = null;
    this.deleteAllError = null;
    this.rellenaError = null;
    this.deletingAll = true;
    this.oVisitasService.deleteAll().subscribe({
      next: (count: number) => {
        this.deletingAll = false;
        this.deleteAllOk = count;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        this.deletingAll = false;
        this.deleteAllError = 'Error eliminando registros';
        console.error(err);
      }
    });
  }

  confirmDelete(): void {
    this.dialog
      .open(ConfirmDeleteDialogComponent, {
        width: '420px',
        disableClose: true,
        data: {
          title: 'Borrar todo',
          message: '¿Seguro que quieres borrar?'
        }
      })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.deleteAll();
        }
      });
  }
}
