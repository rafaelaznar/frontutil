import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPallas } from '../model/pallas';
@Injectable({
  providedIn: 'root'
})
export class PallasService {

  // OJO: Has cambiado la URL a /pallas. 
  // Asegúrate de que en tu Java (PallasApi.java) tengas @RequestMapping("/pallas")
  url: string = "http://localhost:8080/pallas";

  constructor(private oHttp: HttpClient) { }

  // 1. GET PAGE (Listado paginado)
  // IMPORTANTE: Aquí devolvemos Observable<any> porque Spring Boot no devuelve 
  // un array de IPallas[], sino un objeto "Page" que TIENE un array dentro (.content).
  getPage(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set("page", page)
      .set("size", size);
    return this.oHttp.get<any>(this.url, { params: params });
  }

  // 2. GET (Uno solo)
  get(id: number): Observable<IPallas> {
    return this.oHttp.get<IPallas>(this.url + "/" + id);
  }

  // 3. CREATE (Crear)
  create(oPallasEntity: IPallas): Observable<number> {
    return this.oHttp.post<number>(this.url, oPallasEntity);
  }

  // 4. UPDATE (Editar)
  update(oPallasEntity: IPallas): Observable<number> {
    return this.oHttp.put<number>(this.url, oPallasEntity);
  }

  // 5. DELETE (Borrar)
  delete(id: number): Observable<number> {
    return this.oHttp.delete<number>(this.url + "/" + id);
  }

  // 6. POPULATE
  populate(amount: number): Observable<number> {
    return this.oHttp.post<number>(this.url + "/populate/" + amount, null);
  }
}