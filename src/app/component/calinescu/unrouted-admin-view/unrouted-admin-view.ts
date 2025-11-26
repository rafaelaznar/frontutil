import { Component, Input } from '@angular/core';
import { ICalinescu } from '../../../model/calinescu';

@Component({
  selector: 'app-unrouted-admin-view-calinescu',
  imports: [],
  templateUrl: './unrouted-admin-view.html',
  styleUrl: './unrouted-admin-view.css',
})
export class UnroutedAdminViewCalinescu {
  @Input() oCalinescu: ICalinescu | null = null;

}
