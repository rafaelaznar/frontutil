import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGarcia } from '../../model/garcia/garcia';

@Injectable({
  providedIn: 'root'
})
export class GarciaService {
  private url = 'http://localhost:8085/garcia'; // 👈 Añade esta línea

  constructor(private http: HttpClient) { }

  get(id: number): Observable<IGarcia> {
    return this.http.get<IGarcia>(`${this.url}/${id}`);
  }

  create(garcia: Partial<IGarcia>): Observable<number> {
    return this.http.post<number>(this.url, garcia);
  }

  update(garcia: Partial<IGarcia>): Observable<number> {
    return this.http.put<number>(this.url, garcia);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }

  getPage(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&size=${size}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.url}/count`);
  }

  createRandom(cantidad: number): Observable<number> {
    return this.http.post<number>(`${this.url}/random/${cantidad}`, null);
  }
}