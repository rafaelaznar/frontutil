import { Component, inject } from '@angular/core';
import { IFernandezIdea } from '../../../model/fernandez-idea';
import { FernandezIdeaService } from '../../../service/fernandez-idea.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fernandez-routed-user-view',
  imports: [RouterLink],
  templateUrl: './routed-user-view.html',
  styleUrls: ['./routed-user-view.css'],
})
export class FernandezRoutedUserView {
  private readonly oIdeaService = inject(FernandezIdeaService);
  private readonly route = inject(ActivatedRoute);
  
  oIdea: IFernandezIdea | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor() {
    // Obtener el ID de la idea desde la ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    const ideaId = idParam ? Number(idParam) : NaN;
    if (isNaN(ideaId)) {
      console.error('Invalid idea id:', idParam);
      this.error = 'ID de idea inválido';
      this.loading = false;
      return;
    }
    this.getIdea(ideaId);
  }

  ngOnInit() { }

  getIdea(ideaId: number) {
    this.oIdeaService.get(ideaId).subscribe({
      next: (data: IFernandezIdea) => {
        this.oIdea = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching idea:', error);
        this.error = 'Error al cargar la idea';
        this.loading = false;
      },
    });
  }
}
