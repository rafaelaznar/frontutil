import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { ISoares } from '../../../model/soares';
import { SoaresService } from '../../../service/soares';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { DatetimePipe } from "../../../pipe/datetime-pipe";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routed-user-plist',
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
  standalone: true,
  imports: [Paginacion, DatetimePipe, FormsModule, RouterLink, BotoneraRpp, CommonModule],
})
export class SoaresRoutedUserPlist {
  oPage: IPage<ISoares> | null = null;
  numPage: number = 0;
  numRpp: number = 10; // Más preguntas por página para un foro
  numTotalPages: number = 0;
  numTotalElements: number = 0;
  orderField: string = 'fechaCreacion'; // Ordenar por fecha de creación por defecto
  orderDirection: string = 'desc'; // Más reciente primero
  filter: string = '';

  constructor(private oSoaresService: SoaresService) {
    this.getPage();
  }

  getPage(): void {
    this.oSoaresService.getPageUser(this.numPage, this.numRpp, this.orderField, this.orderDirection, this.filter).subscribe({
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

  onFilterChange(filter: string) {
    this.filter = filter;
    this.numPage = 0;
    this.getPage();
  }
}
