import { Component } from '@angular/core';
import { SemperteguiService } from '../../../service/sempertegui/sempertegui.service';
import { ActivatedRoute } from '@angular/router';
import { IPelicula } from '../../../model/sempertegui/sempertegui.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { TrimPipe } from "../../../pipe/trim-pipe";
import { DatetimePipe } from "../../../pipe/datetime-pipe";
import { Location } from "@angular/common";
@Component({
  selector: 'app-sempertegui-routed-user-view',
  imports: [TrimPipe, DatetimePipe],
  templateUrl: './sempertegui-routed-user-view.html',
  styleUrl: './sempertegui-routed-user-view.css',
})
export class SemperteguiRoutedUserView {
movie: IPelicula | null = null;

  constructor(private semperteguiService: SemperteguiService, private route: ActivatedRoute, private location: Location) {
    // Obtener el ID del blog desde la ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    const movieId = idParam ? Number(idParam) : NaN;
    if (isNaN(movieId)) {
      console.error('Invalid movie id:', idParam);
      return;
    }
    this.getMovie(movieId);
  }

  ngOnInit() { }

  getMovie(movieId: number) {
    this.semperteguiService.get(movieId).subscribe({
      next: (data: IPelicula) => {
        this.movie = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching blog:', error);
      },
    });
  }

  goBack(){
    this.location.back();
  }
}
