import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverURL } from '../environment/environment';
import { IPage } from '../model/plist';
import { ICalinescu } from '../model/calinescu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalinescuService {

  constructor(private oHttp: HttpClient) { }

  getPage(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<ICalinescu>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    return this.oHttp.get<IPage<ICalinescu>>(serverURL + `/calinescuListaCompra?page=${page}&size=${rpp}&sort=${order},${direction}`);
  }

  get(id: number): Observable<ICalinescu> {
    return this.oHttp.get<ICalinescu>(serverURL + '/calinescuListaCompra/' + id);
  }

  create(calinescu: Partial<ICalinescu>): Observable<number> {
    return this.oHttp.post<number>(serverURL + '/calinescuListaCompra', calinescu);
  }

  update(calinescu: Partial<ICalinescu>): Observable<number> {
    return this.oHttp.put<number>(serverURL + '/calinescuListaCompra', calinescu);
  }

  delete(id: number): Observable<number> {
    return this.oHttp.delete<number>(serverURL + '/calinescuListaCompra/' + id);
  }

  rellenaListaCompra(numItems: number): Observable<number> {
    return this.oHttp.get<number>(serverURL + '/calinescuListaCompra/rellena/' + numItems);
  }

}
