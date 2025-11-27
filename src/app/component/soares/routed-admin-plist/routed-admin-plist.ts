import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { ISoares } from '../../../model/soares';
import { SoaresService } from '../../../service/soares';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { DatetimePipe } from "../../../pipe/datetime-pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routed-admin-plist',
  templateUrl: './routed-admin-plist.html',
  styleUrl: './routed-admin-plist.css',
  standalone: true,
  imports: [RouterLink, Paginacion, BotoneraRpp, DatetimePipe, FormsModule, CommonModule],
})
export class SoaresRoutedAdminPlist {
  oPage: IPage<ISoares> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  numTotalPages: number = 0;
  numTotalElements: number = 0;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  filter: string = '';
  numPopulate: number = 10;

  constructor(private oSoaresService: SoaresService) {
    this.getPage();
  }

  getPage(): void {
    this.oSoaresService.getPageAdmin(this.numPage, this.numRpp, this.orderField, this.orderDirection, this.filter).subscribe({
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
    this.oSoaresService.populate(amount).subscribe({
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
    this.oSoaresService.empty().subscribe({
      next: (resp: number) => {
        this.numTotalElements = resp;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }
}
