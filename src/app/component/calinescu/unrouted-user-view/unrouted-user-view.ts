import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ICalinescu } from '../../../model/calinescu';
import { DatetimePipe } from "../../../pipe/datetime-pipe";

@Component({
  selector: 'app-unrouted-user-view-calinescu',
  imports: [DatetimePipe, DecimalPipe],
  templateUrl: './unrouted-user-view.html',
  styleUrl: './unrouted-user-view.css',
})
export class UnroutedUserViewCalinescu {
  @Input() oCalinescu: ICalinescu | null = null;
  
}
