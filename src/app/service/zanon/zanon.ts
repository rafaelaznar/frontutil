import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverURL } from '../../environment/environment';
import { IPage } from '../../model/plist';
import { IZanon } from '../../model/zanon/zanon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZanonService {

    constructor(private oHttp: HttpClient) {

    }

    getPage(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<IZanon>> {
        if (order === '') {
            order = 'id';
        }

        if (direction === '') {
            direction = 'asc';
        }

        return this.oHttp.get<IPage<IZanon>>(serverURL + `/blog?page=${page}&size=${rpp}&sort=${order},${direction}`);
    }

    get(id: number): Observable<IZanon> {
        return this.oHttp.get<IZanon>(serverURL + '/blog/' + id);
    }

    create(blog: Partial<IZanon>): Observable<number> {
        return this.oHttp.post<number>(serverURL + '/blog', blog);
    }

    update(blog: Partial<IZanon>): Observable<number> {
        return this.oHttp.put<number>(serverURL + '/blog', blog);
    }

    delete(id: number): Observable<number> {
        return this.oHttp.delete<number>(serverURL + '/blog/' + id);
    }
}
