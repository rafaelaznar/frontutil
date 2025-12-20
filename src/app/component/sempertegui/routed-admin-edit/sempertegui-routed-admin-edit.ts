import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SemperteguiService } from '../../../service/sempertegui/sempertegui.service';
import { IPelicula } from '../../../model/sempertegui/sempertegui.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-sempertegui-routed-admin-edit',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './sempertegui-routed-admin-edit.html',
    styleUrl: './sempertegui-routed-admin-edit.css',
})
export class SemperteguiRoutedAdminEdit implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private semperteguiService = inject(SemperteguiService);
    private dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);

    movieForm!: FormGroup;
    movieId: number | null = null;
    loading: boolean = true;
    error: string | null = null;
    submitting: boolean = false;
    private originalMovie: IPelicula | null = null;

    ngOnInit(): void {
        this.initForm();
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.movieId = +id;
            this.loadMovie(+id);
        } else {
            this.loading = false;
            this.error = 'ID de película no válido';
        }
    }

    initForm(): void {
        this.movieForm = this.fb.group({
            titulo: ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ]],
            sinopsis: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(1024)
            ]],
            generos: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ]],
            director: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ]],
            puntuacion: [null, [
                Validators.min(0),
                Validators.max(100)
            ]],
            anyo: [null, [
                Validators.required,
                Validators.min(1901),
                Validators.max(2155),
                Validators.pattern('^[0-9]*$')
            ]]
        });
    }

    loadMovie(id: number): void {
        this.semperteguiService.get(id).subscribe({
            next: (movie: IPelicula) => {
                this.originalMovie = movie;
                this.movieForm.patchValue({
                    titulo: movie.titulo,
                    generos: movie.generos,
                    director: movie.director,
                    puntuacion: movie.puntuacion,
                    anyo: movie.anyo
                });
                this.loading = false;
            },
            error: (err: HttpErrorResponse) => {
                this.error = 'Error al cargar el post de la película';
                this.loading = false;
                console.error(err);
            },
        });
    }

    onSubmit(): void {
        if (!this.movieForm.valid || !this.movieId) {
            this.movieForm.markAllAsTouched();
            return;
        }

        this.submitting = true;
        const payload: Partial<IPelicula> = {
            id: this.movieId!,
            titulo: this.movieForm.value.titulo,
            generos: this.movieForm.value.generos,
            director: this.movieForm.value.director,
            puntuacion: Number(this.movieForm.value.puntuacion),
            anyo: Number( this.movieForm.value.anyo),
        };

        this.semperteguiService.update(payload).subscribe({
            next: () => {
                this.submitting = false;
                this.router.navigate(['/sempertegui/plist']);
            },
            error: (err: HttpErrorResponse) => {
                this.submitting = false;
                this.error = 'Error al guardar el post de la película';
                console.error(err);
            },
        });
    }

    get titulo() {
        return this.movieForm.get('titulo');
    }

    get generos() {
        return this.movieForm.get('generos');
    }

    get director() {
        return this.movieForm.get('director');
    }

    get puntuacion() {
        return this.movieForm.get('puntuacion');
    }

    get anyo() {
        return this.movieForm.get('anyo');
    }
}
