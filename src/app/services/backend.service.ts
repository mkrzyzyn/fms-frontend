import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  private username = 'user';
  private password = '917ca492-e8d8-4348-8d9d-72378b8a0377';
  
  private credentials = btoa(`${this.username}:${this.password}`);

  private baseUrl = 'http://localhost:8080';

  private http_headers = new HttpHeaders({
    'Authorization': `Basic ${this.credentials}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });


  constructor(private http: HttpClient) {}

  getLoanData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/offers`, {headers: this.http_headers});
  }

  }

  // Add methods for other CRUD operations (POST, PUT, DELETE) as needed.
