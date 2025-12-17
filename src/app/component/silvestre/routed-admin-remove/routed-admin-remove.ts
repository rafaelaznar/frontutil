import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SilvestreService } from '../../../service/silvestre';
import { ISilvestre } from '../../../model/silvestre';
import { HttpErrorResponse } from '@angular/common/http';
import { UnroutedAdminView } from "../unrouted-admin-view/unrouted-admin-view";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-routed-admin-remove',
  imports: [UnroutedAdminView, MatDialogModule, MatSnackBarModule],
  templateUrl: './routed-admin-remove.html',
  styleUrl: './routed-admin-remove.css'
})
export class RoutedAdminRemove implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private silvestreService = inject(SilvestreService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  oSilvestre: ISilvestre | null = null;
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
    this.load(+id);
  }

  load(id: number) {
    this.silvestreService.get(id).subscribe({
      next: (data: ISilvestre) => {
        this.oSilvestre = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Error cargando el post';
        this.loading = false;
        console.error(err);
      }
    });
  }

  confirmDelete() {
    if (!this.oSilvestre) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Borrar publicación', message: '¿Seguro que deseas borrar esta publicación? Esta acción no se puede deshacer.' }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.deleting = true;
      this.silvestreService.delete(this.oSilvestre!.id).subscribe({
        next: () => {
          this.deleting = false;
          this.router.navigate(['/silvestre/plist']);
          this.snackBar.open('Publicación borrada', 'Cerrar', { duration: 3000 });
        },
        error: (err: HttpErrorResponse) => {
          this.deleting = false;
          this.error = 'Error borrando el post';
          console.error(err);
          this.snackBar.open('Error borrando la publicación', 'Cerrar', { duration: 4000 });
        }
      });
    });
  }

  cancel() {
    // antes: this.router.navigate(['/blog/plist']);
    this.router.navigate(['/silvestre/plist']);
  }
}
