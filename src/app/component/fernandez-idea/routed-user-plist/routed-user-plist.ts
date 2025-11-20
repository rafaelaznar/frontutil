import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { IPage } from '../../../model/plist';
import { IFernandezIdea } from '../../../model/fernandez-idea';
import { FernandezIdeaService } from '../../../service/fernandez-idea.service';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { FernandezUnroutedUserView } from "../unrouted-user-view/unrouted-user-view";

@Component({
  selector: 'app-fernandez-routed-user-plist',
  imports: [Paginacion, FernandezUnroutedUserView],
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
})
export class FernandezRoutedUserPlist {
  private readonly oIdeaService = inject(FernandezIdeaService);
  
  oPage: IPage<IFernandezIdea> | null = null;
  numPage: number = 0;
  numRpp: number = 5;

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oIdeaService.getPage(this.numPage, this.numRpp, 'fechaCreacion', 'desc').subscribe({
      next: (data: IPage<IFernandezIdea>) => {
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
}
