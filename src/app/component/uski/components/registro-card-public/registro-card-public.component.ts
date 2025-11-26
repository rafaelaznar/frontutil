import { Component, Input } from '@angular/core';
import { IVisita } from '../../types/visitas';
import { TrimPipe } from '../../../../pipe/trim-pipe';

@Component({
  selector: 'app-registro-card-public',
  imports: [TrimPipe],
  templateUrl: './registro-card-public.component.html',
  styleUrl: './registro-card-public.component.css',
  standalone: true
})
export class RegistroCardPublicComponent {
  @Input() oVisita!: IVisita;
}
