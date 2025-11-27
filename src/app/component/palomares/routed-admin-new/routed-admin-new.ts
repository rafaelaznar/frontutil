import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PalomaresService } from '../../../service/palomares';
import { IPalomares } from '../../../model/palomares';
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
  private palomaresService = inject(PalomaresService);

  palomaresForm!: FormGroup;
  error: string | null = null;
  submitting: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.palomaresForm = this.fb.group({
      titulo: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      categoria: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      completada: [false],
      publicado: [false]
    });
  }

  onSubmit(): void {
    if (!this.palomaresForm.valid) {
      this.palomaresForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload: Partial<IPalomares> = {
      titulo: this.palomaresForm.value.titulo,
      descripcion: this.palomaresForm.value.descripcion,
      categoria: this.palomaresForm.value.categoria,
      completada: this.palomaresForm.value.completada,
      publicado: this.palomaresForm.value.publicado,
    };

    this.palomaresService.create(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/palomares/plist']);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting = false;
        this.error = 'Error al crear la tarea';
        console.error(err);
      },
    });
  }

  get titulo() {
    return this.palomaresForm.get('titulo');
  }

  get descripcion() {
    return this.palomaresForm.get('descripcion');
  }

  get categoria() {
    return this.palomaresForm.get('categoria');
  }

  get completada() {
    return this.palomaresForm.get('completada');
  }

  get publicado() {
    return this.palomaresForm.get('publicado');
  }
}
