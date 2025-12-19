import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPage } from '../types/pageView';
import { IVisita } from '../types/visitas';
import { serverURL } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class VisitasService {

  constructor(private oHttp: HttpClient) { }

  getPublicPage(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<IVisita>> {
    const sort = order && direction ? `${order},${direction}` : 'fechaCreacion,desc';
    return this.oHttp.get<IPage<IVisita>>(serverURL + `/visitas?page=${page}&size=${rpp}&sort=${sort}`);
  }

  getPageAdmin(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<IVisita>> {
    const sort = order && direction ? `${order},${direction}` : 'fechaCreacion,desc';
    return this.oHttp.get<IPage<IVisita>>(serverURL + `/visitas/dashboard?page=${page}&size=${rpp}&sort=${sort}`);
  }

  get(id: number): Observable<IVisita> {
    return this.oHttp.get<IVisita>(serverURL + '/visitas/' + id);
  }

  create(visita: Partial<IVisita>): Observable<number> {
    return this.oHttp.post<number>(serverURL + '/visitas', visita);
  }

  publish(visita: Partial<IVisita>): Observable<number> {
    return this.oHttp.put<number>(serverURL + '/visitas/publish', visita);
  }

  update(visita: Partial<IVisita>): Observable<number> {
    return this.oHttp.put<number>(serverURL + '/visitas/update', visita);
  }

  delete(id: number): Observable<number> {
    return this.oHttp.delete<number>(serverURL + '/visitas/' + id);
  }

  deleteAll(): Observable<number> {
    return this.oHttp.delete<number>(serverURL + '/visitas/delete_all');
  }

  rellenaBlog(numPosts: number): Observable<number> {
    return this.oHttp.get<number>(serverURL + '/visitas/rellena/' + numPosts);
  }
}
