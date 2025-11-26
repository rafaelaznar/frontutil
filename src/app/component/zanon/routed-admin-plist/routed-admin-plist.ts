import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { IBlog } from '../../../model/blog';
import { BlogService } from '../../../service/blog';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";

@Component({
  selector: 'app-routed-admin-plist',
  imports: [RouterLink, Paginacion, BotoneraRpp],
  templateUrl: './routed-admin-plist.html',
  styleUrl: './routed-admin-plist.css',
})
export class RoutedAdminPlist {
  oPage: IPage<IBlog> | null = null;
  numPage: number = 0;
  numRpp: number = 5;

  constructor(private oBlogService: BlogService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oBlogService.getPage(this.numPage, this.numRpp).subscribe({
      next: (data: IPage<IBlog>) => {
        this.oPage = data;
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
}
