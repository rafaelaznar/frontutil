import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IPage } from '../../../model/plist';
import { IPalomares } from '../../../model/palomares';
import { PalomaresService } from '../../../service/palomares';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { UnroutedUserView2 } from "../unrouted-user-view2/unrouted-user-view2";
import { debug } from '../../../environment/environment';


@Component({
  selector: 'app-routed-user-plist',
  imports: [CommonModule, RouterLink, Paginacion, UnroutedUserView2],
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
})
export class RoutedUserPlist {
  oPage: IPage<IPalomares> | null = null;
  numPage: number = 0;
  numRpp: number = 2;
  // contador actual de elementos en la tabla pública
  totalElementsCount: number = 0;
  debugging: boolean = debug;

  constructor(private oPalomaresService: PalomaresService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oPalomaresService.getPage(this.numPage, this.numRpp, 'fechaCreacion', 'desc').subscribe({
      next: (data: IPage<IPalomares>) => {
        // Filtrar solo las tareas publicadas
        this.debugging && console.log('📥 Datos recibidos del backend:', data.content?.length, 'tareas');
        
        if (data.content) {
          // Mostrar cada tarea antes del filtro
          this.debugging && data.content.forEach(t => {
            console.log(`  Tarea ${t.id} - "${t.titulo}":`, 
              'publicado =', t.publicado, 
              '(tipo:', typeof t.publicado + ')',
              '- Pasa filtro:', (t.publicado === true || t.publicado === 1 || (t.publicado as any) === "1")
            );
          });
          
          // FILTRAR: Manejar boolean (true), number (1) y string ("1")
          const tareasFiltradas = data.content.filter(tarea => {
            return tarea.publicado === true || tarea.publicado === 1 || (tarea.publicado as any) === "1" || String(tarea.publicado) === "1";
          });
          
          this.debugging && console.log('✅ Después del filtro:', tareasFiltradas.length, 'tareas publicadas');
          
          // IMPORTANTE: Actualizar el content con las tareas filtradas
          data.content = tareasFiltradas;
        }
        
        this.oPage = data;
        this.totalElementsCount = data.content?.length ?? 0;
        
        // OJO! si estamos en una página que supera el límite entonces nos situamos en la ultima disponible
        if (this.numPage > 0 && this.numPage >= data.totalPages) {
          this.numPage = data.totalPages - 1;
          this.getPage();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.debugging && console.error('❌ Error al cargar tareas:', error);
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
