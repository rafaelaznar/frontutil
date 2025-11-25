import { Component, Input } from '@angular/core';
import { IGarcia } from '../../../model/garcia/garcia';
import { DatetimePipe } from "../../../pipe/datetime-pipe";

@Component({
  selector: 'app-unrouted-user-view',
  imports: [DatetimePipe],
  templateUrl: './unrouted-user-view.html',
  styleUrl: './unrouted-user-view.css',
})
export class UnroutedUserView {
  @Input() oGarcia: IGarcia | null = null;
  
}
