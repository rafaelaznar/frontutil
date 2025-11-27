import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SoaresService } from '../../../service/soares';
import { ISoares } from '../../../model/soares';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-routed-admin-new',
  templateUrl: './routed-admin-new.html',
  styleUrl: './routed-admin-new.css',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class SoaresRoutedAdminNew implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private soaresService = inject(SoaresService);

  soaresForm!: FormGroup;
  error: string | null = null;

  ngOnInit(): void {
    this.soaresForm = this.fb.group({
      preguntas: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      publicacion: [false, Validators.required],
    });
  }

  onSubmit() {
    if (this.soaresForm.valid) {
      const oSoares: ISoares = {
        id: 0, // El ID se generará en el backend
        preguntas: this.soaresForm.value.preguntas,
        publicacion: this.soaresForm.value.publicacion,
        fechaCreacion: '', // Se generará en el backend
        fechaModificacion: '', // Se generará en el backend
      };

      this.soaresService.createOne(oSoares).subscribe({
        next: (id: number) => {
          this.router.navigate(['/admin/soares/plist']); // Redirigir al listado después de crear
        },
        error: (err: HttpErrorResponse) => {
          this.error = err.error.message || 'Error al crear la pregunta.';
          console.log(err);
        }
      });
    }
  }
}
