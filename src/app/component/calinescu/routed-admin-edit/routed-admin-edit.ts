import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalinescuService } from '../../../service/calinescu.service';
import { ICalinescu } from '../../../model/calinescu';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-routed-admin-edit-calinescu',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './routed-admin-edit.html',
    styleUrl: './routed-admin-edit.css',
})
export class RoutedAdminEditCalinescu implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private calinescuService = inject(CalinescuService);

    calinescuForm!: FormGroup;
    itemId: number | null = null;
    loading: boolean = true;
    error: string | null = null;
    submitting: boolean = false;
    private originalItem: ICalinescu | null = null;

    ngOnInit(): void {
        this.inicializarFormulario();
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.itemId = +id;
            this.cargarItem(+id);
        } else {
            this.loading = false;
            this.error = 'ID de item no válido';
        }
    }

    inicializarFormulario(): void {
        this.calinescuForm = this.fb.group({
            nombre: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255)]],
            contenido: ['', [
                Validators.required,
                Validators.minLength(3)]],
            fechaCompraEsperada: [''],
            publicado: [true],
            precio: [0, [Validators.min(0)]],
        });
    }

    cargarItem(id: number): void {
        this.calinescuService.get(id).subscribe({
            next: (item: ICalinescu) => {
                this.originalItem = item;
                
                // Convertir fecha del backend (yyyy-MM-dd HH:mm:ss) a formato datetime-local (yyyy-MM-ddTHH:mm)
                let fechaParaInput = '';
                if (item.fecha_compra_esperada) {
                    fechaParaInput = this.convertirFechaParaInput(item.fecha_compra_esperada);
                }
                
                this.calinescuForm.patchValue({
                    nombre: item.nombre,
                    contenido: item.contenido,
                    fechaCompraEsperada: fechaParaInput,
                    publicado: item.publicado,
                    precio: item.precio || 0,
                });
                this.loading = false;
            },
            error: (err: HttpErrorResponse) => {
                this.error = 'Error al cargar el item';
                this.loading = false;
                console.error(err);
            },
        });
    }

    convertirFechaParaInput(fechaBackend: string): string {
        // Convierte "2025-11-26 20:30:00" a "2025-11-26T20:30"
        return fechaBackend.replace(' ', 'T').substring(0, 16);
    }

    enviarFormulario(): void {
        if (!this.calinescuForm.valid || !this.itemId) {
            this.calinescuForm.markAllAsTouched();
            return;
        }

        this.submitting = true;
        
        // Convertir fecha si existe
        let fechaFormateada: string | undefined = undefined;
        if (this.calinescuForm.value.fechaCompraEsperada) {
            const fecha = new Date(this.calinescuForm.value.fechaCompraEsperada);
            fechaFormateada = this.formatearFecha(fecha);
        }
        
        const payload: Partial<ICalinescu> = {
            id: this.itemId!,
            nombre: this.calinescuForm.value.nombre,
            contenido: this.calinescuForm.value.contenido,
            fecha_compra_esperada: fechaFormateada,
            publicado: this.calinescuForm.value.publicado,
            precio: this.calinescuForm.value.precio || 0,
        };

        this.calinescuService.update(payload).subscribe({
            next: () => {
                this.submitting = false;
                this.router.navigate(['/calinescu/plist']);
            },
            error: (err: HttpErrorResponse) => {
                this.submitting = false;
                this.error = 'Error al guardar el item';
                console.error(err);
            },
        });
    }

    formatearFecha(fecha: Date): string {
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        const hours = String(fecha.getHours()).padStart(2, '0');
        const minutes = String(fecha.getMinutes()).padStart(2, '0');
        const seconds = String(fecha.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    get nombre() {
        return this.calinescuForm.get('nombre');
    }

    get contenido() {
        return this.calinescuForm.get('contenido');
    }

    get fechaCompraEsperada() {
        return this.calinescuForm.get('fechaCompraEsperada');
    }

    get publicado() {
        return this.calinescuForm.get('publicado');
    }

    get precio() {
        return this.calinescuForm.get('precio');
    }
}
