import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { ISoares } from '../../../model/soares';
import { SoaresService } from '../../../service/soares';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routed-user-plist',
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
  standalone: true,
  imports: [Paginacion, FormsModule, RouterLink, BotoneraRpp, CommonModule],
})
export class SoaresRoutedUserPlist implements OnInit {
  oPage: IPage<ISoares> | null = null;
  numPage: number = 0;
  numRpp: number = 10;
  numTotalPages: number = 0;
  numTotalElements: number = 0;
  orderField: string = 'fechaCreacion';
  orderDirection: string = 'desc';
  filter: string = '';

  constructor(private soaresService: SoaresService) {}

  ngOnInit(): void {
    this.getPage();
  }

  getPage(): void {
    // Usar getPageUser que solo trae las publicadas y aprobadas (asumiendo que el servicio lo implementa)
    this.soaresService.getPageUser(this.numPage, this.numRpp, this.orderField, this.orderDirection, this.filter).subscribe({
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
