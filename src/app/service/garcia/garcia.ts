import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverURL } from '../../environment/environment';
import { IPage } from '../../model/plist';
import { IGarcia } from '../../model/garcia/garcia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GarciaService {

  constructor(private oHttp: HttpClient) { }

  getPage(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<IGarcia>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    return this.oHttp.get<IPage<IGarcia>>(serverURL + `/garcia?page=${page}&size=${rpp}&sort=${order},${direction}`);
  }

  get(id: number): Observable<IGarcia> {
    return this.oHttp.get<IGarcia>(serverURL + '/garcia/' + id);
  }

  create(garcia: Partial<IGarcia>): Observable<number> {
    return this.oHttp.post<number>(serverURL + '/garcia', garcia);
  }

  update(garcia: Partial<IGarcia>): Observable<number> {
    return this.oHttp.put<number>(serverURL + '/garcia', garcia);
  }

  delete(id: number): Observable<number> {
    return this.oHttp.delete<number>(serverURL + '/garcia/' + id);
  }

  rellenaBlog(numPosts: number): Observable<number> {
    return this.oHttp.get<number>(serverURL + '/garcia/rellena/' + numPosts);
  }

}
