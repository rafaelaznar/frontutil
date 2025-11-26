import { Component, Input } from '@angular/core';
import { IVisita } from '../../types/visitas';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VisitasService } from '../../services/visitas';

@Component({
  selector: 'tr[app-registro-tabla]',
  imports: [CommonModule, RouterLink],
  templateUrl: './registro-tabla-private.component.html',
  styleUrl: './registro-tabla-private.component.css',
  standalone: true
})
export class RegistroTablaComponent {
  constructor(private oVisitasService: VisitasService) {}

  @Input() visita!: IVisita;

  onTogglePublish() {
    const nuevoEstado = !this.visita.estaPublicado;
    this.oVisitasService.update({ id: this.visita.id, estaPublicado: nuevoEstado }).subscribe({
      next: () => (this.visita.estaPublicado = nuevoEstado),
      error: (err) => console.error('No se pudo actualizar', err),
    });
  }
}
