import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { ISoares } from '../../../model/soares';
import { SoaresService } from '../../../service/soares';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routed-admin-plist',
  templateUrl: './routed-admin-plist.html',
  styleUrl: './routed-admin-plist.css',
  standalone: true,
  imports: [RouterLink, Paginacion, FormsModule, CommonModule],
})
export class SoaresRoutedAdminPlist implements OnInit {
  oPage: IPage<ISoares> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  numTotalPages: number = 0;
  numTotalElements: number = 0;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  filter: string = '';
  numPopulate: number = 10;

  constructor(private soaresService: SoaresService) {}

  ngOnInit(): void {
    this.getPage();
  }

  getPage(): void {
    this.soaresService.getPageAdmin(this.numPage, this.numRpp, this.orderField, this.orderDirection, this.filter).subscribe({
      next: (resp: IPage<ISoares>) => {
        this.oPage = resp;
        this.numTotalPages = resp.totalPages;
        this.numTotalElements = resp.totalElements;
        this.numPage = resp.number;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  onPageChange(n: number) {
    this.numPage = n;
    this.getPage();
  }

  onRppChange(rpp: number) {
    this.numRpp = rpp;
    this.numPage = 0;
    this.getPage();
  }

  onOrder(order: string) {
    this.orderField = order;
    this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.numPage = 0;
    this.getPage();
  }

  onPopulate(amount: any) {
    amount = parseInt(amount);
    this.soaresService.populate(amount).subscribe({
      next: (resp: number) => {
        this.numTotalElements = resp;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  onEmpty() {
    this.soaresService.empty().subscribe({
      next: (resp: number) => {
        this.numTotalElements = resp;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  // Lógica para el botón de Publicación (toggle)
  togglePublicacion(soares: ISoares): void {
    const updatedSoares: ISoares = {
      ...soares,
      publicacion: !soares.publicacion,
    };
    this.soaresService.updateOne(updatedSoares).subscribe({
      next: () => {
        soares.publicacion = !soares.publicacion; // Actualiza el estado localmente
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cambiar el estado de publicación:', err);
      },
    });
  }

  // Lógica para el botón de Aprobación (toggle)
  toggleAprobacion(soares: ISoares): void {
    // Lógica de aprobación: si está pendiente, se aprueba. Si está aprobado, se desaprueba (vuelve a pendiente).
    // Asumo que 'aprobacion' es un campo booleano o similar. Si es un estado más complejo (e.g., 'PENDIENTE', 'APROBADO', 'RECHAZADO'),
    // se necesitaría más información. Por ahora, lo implemento como un simple toggle booleano.
    const updatedSoares: ISoares = {
      ...soares,
      aprobacion: !soares.aprobacion, // Asumiendo que existe un campo 'aprobacion' en ISoares
    };
    this.soaresService.updateOne(updatedSoares).subscribe({
      next: () => {
        soares.aprobacion = !soares.aprobacion; // Actualiza el estado localmente
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cambiar el estado de aprobación:', err);
      },
    });
  }
}
