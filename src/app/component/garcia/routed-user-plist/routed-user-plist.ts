import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IPage } from '../../../model/plist';
import { IGarcia } from '../../../model/garcia/garcia';
import { GarciaService } from '../../../service/garcia/garcia';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { UnroutedUserView2 } from "../unrouted-user-view2/unrouted-user-view2";


@Component({
  selector: 'app-routed-user-plist',
  imports: [Paginacion, UnroutedUserView2],
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
})
export class RoutedUserPlist {
  oPage: IPage<IGarcia> | null = null;
  numPage: number = 0;
  numRpp: number = 2;

  constructor(private oGarciaService: GarciaService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oGarciaService.getPage(this.numPage, this.numRpp, 'fechaInicio', 'desc').subscribe({
      next: (data: IPage<IGarcia>) => {
        this.oPage = data;
        // OJO! si estamos en una página que supera el límite entonces nos situamos en la ultima disponible
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
