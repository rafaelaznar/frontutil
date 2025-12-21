import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// CONFIRM DELETE ALL DIALOG
@Component({
  selector: 'app-confirm-delete-all-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Confirmar' }}</h2>
    <mat-dialog-content>
      <p>{{ data.message || '¿Confirmar la acción?' }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button (click)="onConfirm()" cdkFocusInitial style="background-color: #d32f2f; color: white;">Borrar todo</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDeleteAllDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteAllDialog>, @Inject(MAT_DIALOG_DATA) public data: { title?: string; message?: string }) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

// CONFIRM DELETE DIALOG
@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Eliminar Registro ID: <strong class="small">{{ data.id }}</strong></h2>
    <mat-dialog-content>
      <p>¿Está seguro que deseas borrar <strong>{{ data.titulo }}</strong></p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button (click)="onConfirm()" cdkFocusInitial>Eliminar</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDeleteDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialog>, @Inject(MAT_DIALOG_DATA) public data: { id?: number; titulo?: string }) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

// CONFIRM LEAVE DIALOG
@Component({
  selector: 'app-confirm-leave-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Borrar Película' }}</h2>
    <mat-dialog-content>
      <p>{{ data.message || '¿Confirmar la acción?' }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button (click)="onConfirm()">Salir</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmLeaveDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmLeaveDialog>, @Inject(MAT_DIALOG_DATA) public data: { title?: string; message?: string }) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
