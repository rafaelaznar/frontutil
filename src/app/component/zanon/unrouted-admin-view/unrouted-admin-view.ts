import { Component, Input } from '@angular/core';
import { IBlog } from '../../../model/blog';

@Component({
  selector: 'app-unrouted-admin-view',
  imports: [],
  templateUrl: './unrouted-admin-view.html',
  styleUrl: './unrouted-admin-view.css',
})
export class UnroutedAdminView {
  @Input() oBlog: IBlog | null = null;

}
