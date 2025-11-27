import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { IPage } from '../../../model/plist';
import { IFernandezIdea } from '../../../model/fernandez-idea';
import { FernandezIdeaService } from '../../../service/fernandez-idea.service';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { FernandezUnroutedUserView } from "../unrouted-user-view/unrouted-user-view";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";

@Component({
  selector: 'app-fernandez-routed-user-plist',
  imports: [Paginacion, FernandezUnroutedUserView, BotoneraRpp],
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
})
export class FernandezRoutedUserPlist {
  private readonly oIdeaService = inject(FernandezIdeaService);
  
  oPage: IPage<IFernandezIdea> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  // Search / filter / sort
  searchTerm: string = '';
  categoriaFilter: string = 'ALL';
  orderField: string = 'fechaCreacion';
  orderDirection: string = 'desc';

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    // Primera petición: obtener la página solicitada
  this.oIdeaService.getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection, true, this.searchTerm, this.categoriaFilter).subscribe({
      next: (data: IPage<IFernandezIdea>) => {
        // Si la página ya contiene suficientes ideas públicas, asignamos directamente
        if (data.content.length >= this.numRpp) {
          this.oPage = data;
        } else {
          // Si no hay suficientes ideas públicas en esta página, intentamos cargar páginas siguientes
          const collected: IFernandezIdea[] = [...data.content];
          const totalPages = data.totalPages;

          const fetchNext = (nextPage: number) => {
            if (collected.length >= this.numRpp || nextPage >= totalPages) {
              // Ajustar el objeto paginado resultante
              const result: IPage<IFernandezIdea> = {
                ...data,
                content: collected.slice(0, this.numRpp),
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                size: data.size,
                number: data.number,
              };
              this.oPage = result;
              // Si la página actual solicitada está fuera de rango, reajustar
              if (this.numPage > 0 && this.numPage >= data.totalPages) {
                this.numPage = data.totalPages - 1;
                this.getPage();
              }
              return;
            }
            // Solicitar la siguiente página y añadir sus ideas públicas
            this.oIdeaService.getPage(nextPage, this.numRpp, this.orderField, this.orderDirection, true, this.searchTerm, this.categoriaFilter).subscribe({
              next: (nextData: IPage<IFernandezIdea>) => {
                collected.push(...nextData.content);
                fetchNext(nextPage + 1);
              },
              error: (err: HttpErrorResponse) => {
                console.error('Error fetching next page for public fill:', err);
                // Devolver lo que tengamos hasta ahora
                const result: IPage<IFernandezIdea> = {
                  ...data,
                  content: collected.slice(0, this.numRpp),
                  totalPages: data.totalPages,
                  totalElements: data.totalElements,
                  size: data.size,
                  number: data.number,
                };
                this.oPage = result;
              },
            });
          };

          // Iniciar la carga de páginas siguientes
          fetchNext(this.numPage + 1);
        }

        // Si la página solicitada supera el total devuelto por el backend, movernos a la última disponible
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

  onSearch(term: string) {
    this.searchTerm = term || '';
    this.numPage = 0;
    this.getPage();
    return false;
  }

  onCategoriaChange(cat: string) {
    this.categoriaFilter = cat || 'ALL';
    this.numPage = 0;
    this.getPage();
    return false;
  }

  onOrderChange(field: string) {
    this.orderField = field || 'fechaCreacion';
    this.numPage = 0;
    this.getPage();
    return false;
  }

  toggleDirection() {
    this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    this.numPage = 0;
    this.getPage();
    return false;
  }
}
