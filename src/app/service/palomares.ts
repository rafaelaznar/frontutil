import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverURL } from '../environment/environment';
import { IPage } from '../model/plist';
import { IPalomares } from '../model/palomares';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PalomaresService {

  constructor(private oHttp: HttpClient) { }

  getPage(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<IPalomares>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    return this.oHttp.get<IPage<IPalomares>>(serverURL + `/palomares?page=${page}&size=${rpp}&sort=${order},${direction}`);
  }

  get(id: number): Observable<IPalomares> {
    return this.oHttp.get<IPalomares>(serverURL + '/palomares/' + id);
  }

  create(palomares: Partial<IPalomares>): Observable<number> {
    return this.oHttp.post<number>(serverURL + '/palomares', palomares);
  }

  update(palomares: Partial<IPalomares>): Observable<number> {
    return this.oHttp.put<number>(serverURL + '/palomares', palomares);
  }

  delete(id: number): Observable<number> {
    return this.oHttp.delete<number>(serverURL + '/palomares/' + id);
  }

  rellenaPalomares(numTareas: number): Observable<number> {
    return this.oHttp.get<number>(serverURL + '/palomares/rellena/' + numTareas);
  }

}
