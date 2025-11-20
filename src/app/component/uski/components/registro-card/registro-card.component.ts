import { Component, Input } from '@angular/core';
import { IVisita } from '../../types/visitas';

@Component({
  selector: 'app-registro-card',
  imports: [],
  templateUrl: './registro-card.component.html',
  styleUrl: './registro-card.component.css',
  standalone: true
})
export class RegistroCardComponent {
  @Input() oVisita!: IVisita;
}
