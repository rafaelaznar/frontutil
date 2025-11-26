import { Component } from '@angular/core';
import { ICastanyera } from '../../../model/castanyera';
import { CastanyeraService } from '../../../service/castanyera';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UnroutedUserView } from "../castanyera-unrouted-user-view/unrouted-user-view";

@Component({
  selector: 'app-routed-user-view',
  imports: [UnroutedUserView],
  templateUrl: './routed-user-view.html',
  styleUrls: ['./routed-user-view.css'],
})
export class RoutedUserView {
  oCastanyera: ICastanyera | null = null;

  constructor(private oCastanyeraService: CastanyeraService, private route: ActivatedRoute) {
    // Obtener el ID del journal desde la ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    const castanyeraId = idParam ? Number(idParam) : NaN;
    if (isNaN(castanyeraId)) {
      console.error('Invalid journal id:', idParam);
      return;
    }
    this.getCastanyera(castanyeraId);
  }

  ngOnInit() { }

  getCastanyera(castanyeraId: number) {
    this.oCastanyeraService.get(castanyeraId).subscribe({
      next: (data: ICastanyera) => {
        this.oCastanyera = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching journal:', error);
      },
    });
  }
}
