import { Component } from '@angular/core';
import { ICalinescu } from '../../../model/calinescu';
import { CalinescuService } from '../../../service/calinescu.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UnroutedUserViewCalinescu } from "../unrouted-user-view/unrouted-user-view";

@Component({
  selector: 'app-routed-user-view-calinescu',
  imports: [UnroutedUserViewCalinescu],
  templateUrl: './routed-user-view.html',
  styleUrls: ['./routed-user-view.css'],
})
export class RoutedUserViewCalinescu {
  oCalinescu: ICalinescu | null = null;

  constructor(private oCalinescuService: CalinescuService, private route: ActivatedRoute) {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id)) {
      console.error('Invalid id:', idParam);
      return;
    }
    this.obtenerCalinescu(id);
  }

  ngOnInit() { }

  obtenerCalinescu(id: number) {
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
