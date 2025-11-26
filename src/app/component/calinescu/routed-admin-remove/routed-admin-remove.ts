import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalinescuService } from '../../../service/calinescu.service';
import { ICalinescu } from '../../../model/calinescu';
import { HttpErrorResponse } from '@angular/common/http';
import { UnroutedAdminViewCalinescu } from "../unrouted-admin-view/unrouted-admin-view";

@Component({
  selector: 'app-routed-admin-remove-calinescu',
  imports: [UnroutedAdminViewCalinescu],
  templateUrl: './routed-admin-remove.html',
  styleUrl: './routed-admin-remove.css'
})
export class RoutedAdminRemoveCalinescu implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private calinescuService = inject(CalinescuService);

  oCalinescu: ICalinescu | null = null;
  loading: boolean = true;
  error: string | null = null;
  deleting: boolean = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    this.cargar(+id);
  }

  cargar(id: number) {
    this.calinescuService.get(id).subscribe({
      next: (data: ICalinescu) => {
        this.oCalinescu = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Error cargando el item';
        this.loading = false;
        console.error(err);
      }
    });
  }

  confirmarBorrado() {
    if (!this.oCalinescu) return;
    this.deleting = true;
    this.calinescuService.delete(this.oCalinescu.id).subscribe({
      next: () => {
        this.deleting = false;
        this.router.navigate(['/calinescu/plist']);
      },
      error: (err: HttpErrorResponse) => {
        this.deleting = false;
        this.error = 'Error borrando el item';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/calinescu/plist']);
  }
}
