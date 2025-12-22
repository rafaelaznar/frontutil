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
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  totalElementsCount: number = 0;

  constructor(
    private oVisitasService: VisitasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oVisitasService.getPageAdmin(this.numPage, this.numRpp, this.column, this.direction).subscribe({
      next: (data: IPage<IVisita>) => {
        this.oPage = data;
        this.totalElementsCount = data.totalElements ?? 0;
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
    this.rellenaError = null;
    this.deleteAllError = null;
    this.rellenando = true;
    this.snackBar.open(`Generando ${this.rellenaCantidad} registros... (actual: ${this.totalElementsCount})`, 'Cerrar', { duration: 3000 });
    this.oVisitasService.rellenaBlog(this.rellenaCantidad).subscribe({
      next: (count: number) => {
        this.rellenando = false;
        this.rellenaOk = this.rellenaCantidad;
        this.getPage(); // refrescamos listado
        this.snackBar.open(`Generados ${count} registros. Total ahora: ${this.totalElementsCount + count}`, 'Cerrar', { duration: 4000 });
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
    this.snackBar.open(`Borrando ${this.rellenaCantidad}todos los registros...`, 'Cerrar', { duration: 4000 });
    this.oVisitasService.deleteAll().subscribe({
      next: (count: number) => {
        this.deletingAll = false;
        this.deleteAllOk = count;
        this.getPage();
        this.snackBar.open(`La tabla está vacia.`, 'Cerrar', { duration: 4000 });
      },
      error: (err: HttpErrorResponse) => {
        this.deletingAll = false;
        this.deleteAllError = 'Error eliminando registros';
        console.error(err);
      }
    });
  }

  confirmDeleteDB(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        disableClose: true,
        data: {
          title: 'Vaciar todos los datos',
          message: '¿Está seguro de que desea borrar TODOS los registros? Esta acción es irreversible.'
        }
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteAll();
      }
    });
  }
}
