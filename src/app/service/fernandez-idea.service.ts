import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { serverURL } from '../environment/environment';
import { IPage } from '../model/plist';
import { IFernandezIdea } from '../model/fernandez-idea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FernandezIdeaService {
  private readonly http = inject(HttpClient);

  getPage(page: number, rpp: number, order: string = '', direction: string = '', publico?: boolean): Observable<IPage<IFernandezIdea>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    let url = serverURL + `/idea?page=${page}&size=${rpp}&sort=${order},${direction}`;
    if (publico !== undefined) {
      url += `&publico=${publico}`;
    }
    return this.http.get<IPage<IFernandezIdea>>(url);
  }

  get(id: number): Observable<IFernandezIdea> {
    return this.http.get<IFernandezIdea>(serverURL + '/idea/' + id);
  }

  create(idea: Partial<IFernandezIdea>): Observable<number> {
    return this.http.post<number>(serverURL + '/idea', idea);
  }

  update(idea: Partial<IFernandezIdea>): Observable<number> {
    return this.http.put<number>(serverURL + '/idea', idea);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(serverURL + '/idea/' + id);
  }

  count(): Observable<number> {
    return this.http.get<number>(serverURL + '/idea/count');
  }

    bulkCreate(amount: number = 20): Observable<number> {
      // El backend debe tener un endpoint tipo /idea/bulk/{amount}
      return this.http.post<number>(serverURL + `/idea/bulk/${amount}`, {});
    }
}
