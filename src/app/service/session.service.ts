import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IJWT } from '../model/token';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public subjectLogin: Subject<void> = new Subject<void>();
  public subjectLogout: Subject<void> = new Subject<void>();

  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
    this.subjectLogin.next();
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.subjectLogout.next();
  }

  isSessionActive(): boolean {
    return this.getToken() !== null || localStorage.getItem('token') !== null;
  }

  parseJWT(token: string): IJWT {
    if (!token) {
      throw new Error('Token vacío o indefinido.');
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT inválido. Debe contener header, payload y signature.');
    }

    try {
      const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/'); // normalizar base64url

      const decodedPayload = atob(payloadBase64);
      const payload: unknown = JSON.parse(decodedPayload);

      // Validar formato del payload
      const jwt = payload as Partial<IJWT>;
      if (
        typeof jwt.iss !== 'string' ||
        typeof jwt.sub !== 'string' ||
        typeof jwt.username !== 'string' ||
        typeof jwt.iat !== 'number' ||
        typeof jwt.exp !== 'number'
      ) {
        throw new Error('El payload no coincide con el formato IJWT.');
      }

      return jwt as IJWT;
    } catch (error) {
      throw new Error('Error al parsear el JWT: ' + (error as Error).message);
    }
  }
}
