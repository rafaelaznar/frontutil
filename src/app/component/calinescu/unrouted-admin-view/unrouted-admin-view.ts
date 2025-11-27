import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ICalinescu } from '../../../model/calinescu';

@Component({
  selector: 'app-unrouted-admin-view-calinescu',
  imports: [DecimalPipe],
  templateUrl: './unrouted-admin-view.html',
  styleUrl: './unrouted-admin-view.css',
})
export class UnroutedAdminViewCalinescu {
  @Input() oCalinescu: ICalinescu | null = null;

}
