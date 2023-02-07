import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUri: string = "https://delifoodbackend-production.up.railway.app/api"

  constructor(
    private http: HttpClient,
  ) { }

  login(credentials: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(`${this.apiUri}/login`, credentials, { headers })
  }

  signup(data: any) {
    return this.http.post(`${this.apiUri}/users`, data)
  }

  profile() {
    return this.http.get(`${this.apiUri}/profile/${sessionStorage.getItem('id')}`)
  }

  update(data: any) {
    return this.http.put(`${this.apiUri}/profile/${sessionStorage.getItem('id')}`, data)
  }
}
