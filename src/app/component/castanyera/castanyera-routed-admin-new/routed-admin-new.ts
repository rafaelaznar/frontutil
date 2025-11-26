import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CastanyeraService } from '../../../service/castanyera';
import { ICastanyera } from '../../../model/castanyera';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-routed-admin-new',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './routed-admin-new.html',
  styleUrl: './routed-admin-new.css',
})
export class RoutedAdminNew implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private castanyeraService = inject(CastanyeraService);

  castanyeraForm!: FormGroup;
  error: string | null = null;
  submitting: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.castanyeraForm = this.fb.group({
      titulo: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1024)
      ]],
      contenido: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      etiquetas: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1024)
      ]],
    });
  }

  onSubmit(): void {
    if (!this.castanyeraForm.valid) {
      this.castanyeraForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload: Partial<ICastanyera> = {
      titulo: this.castanyeraForm.value.titulo,
      contenido: this.castanyeraForm.value.contenido,
      etiquetas: this.castanyeraForm.value.etiquetas,
    };

    this.castanyeraService.create(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/castanyera/plist']);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting = false;
        this.error = 'Error al crear el post';
        console.error(err);
      },
    });
  }

  get titulo() {
    return this.castanyeraForm.get('titulo');
  }

  get contenido() {
    return this.castanyeraForm.get('contenido');
  }

  get etiquetas() {
    return this.castanyeraForm.get('etiquetas');
  }
}
