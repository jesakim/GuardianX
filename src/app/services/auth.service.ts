import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDto } from '../models/register.dto';
import { Observable } from 'rxjs';
import { Response } from '../utils/response.interface';
import { Router } from '@angular/router';
import { LoginDto } from '../models/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ){}


  register(dto: RegisterDto): Observable<Response<any>> {
    return this.http.post<any>(`${this.apiUrl}/register`, dto);
  }

  login(dto:LoginDto): Observable<Response<any>>{
    return this.http.post<any>(`${this.apiUrl}/login`,dto);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  logout(): void {
    this.http.get<any>(`${this.apiUrl}/logout`).subscribe(success=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }

  refreshToken(dto:any): Observable<Response<any>> {
    return this.http.post<any>(`${this.apiUrl}/refresh`,dto);
  }
}
