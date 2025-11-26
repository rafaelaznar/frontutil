import { Component, Input } from '@angular/core';
import { IBlog } from '../../../model/blog';

@Component({
  selector: 'app-unrouted-user-view',
  imports: [],
  templateUrl: './unrouted-user-view.html',
  styleUrl: './unrouted-user-view.css',
})
export class UnroutedUserView {
  @Input() oBlog: IBlog | null = null;
  
}
