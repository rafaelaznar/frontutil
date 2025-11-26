import { Component } from '@angular/core';
import { ICalinescu } from '../../../model/calinescu';
import { CalinescuService } from '../../../service/calinescu.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UnroutedAdminViewCalinescu } from "../unrouted-admin-view/unrouted-admin-view";

@Component({
  selector: 'app-routed-admin-view-calinescu',
  imports: [UnroutedAdminViewCalinescu],
  templateUrl: './routed-admin-view.html',
  styleUrl: './routed-admin-view.css',
})
export class RoutedAdminViewCalinescu {
  oCalinescu: ICalinescu | null = null;

  constructor(private oCalinescuService: CalinescuService, private route: ActivatedRoute) {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id)) {
      console.error('Invalid id:', idParam);
      return;
    }
    this.getCalinescu(id);
  }

  ngOnInit() { }

  getCalinescu(id: number) {
    this.oCalinescuService.get(id).subscribe({
      next: (data: ICalinescu) => {
        this.oCalinescu = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching item:', error);
      },
    });
  }
}
