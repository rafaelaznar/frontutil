import { Component, Input } from '@angular/core';
import { IGarcia } from '../../../model/garcia/garcia';

@Component({
  selector: 'app-Garciaunrouted-admin-view',
  imports: [],
  templateUrl: './Garciaunrouted-admin-view.html',
  styleUrl: './Garciaunrouted-admin-view.css',
})
export class UnroutedAdminViewGarcia {
  @Input() oGarcia: IGarcia | null = null;
}
