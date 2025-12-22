import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VisitasService } from '../../services/visitas.service';
import { IVisita } from '../../types/visitas';
import { DatetimePipe } from "../../../../pipe/datetime-pipe";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-visitas-view-page',
  imports: [CommonModule, RouterLink, DatetimePipe, MatSnackBarModule],
  templateUrl: './visitas-view.page.html',
  styleUrl: './visitas-view.page.css',
})
export class UskiVisitasViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  private visitasService = inject(VisitasService);
  private snackBar = inject(MatSnackBar);

  oVisita: IVisita | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id)) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    this.load(id);
  }

  load(id: number) {
    this.visitasService.get(id).subscribe({
      next: (data: IVisita) => {
        this.oVisita = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Error cargando el registro';
        this.loading = false;
        this.snackBar.open('Error cargando el registro', 'Cerrar', { duration: 4000 });
        console.error(err);
      },
    });
  }
}
