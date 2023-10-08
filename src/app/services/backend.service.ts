import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  private username = 'user';
  private password = '60015829-2f2f-4c60-9c13-d69457a8b539';
  
  private credentials = btoa(`${this.username}:${this.password}`);

  private baseUrl = 'http://localhost:8080';

  private headers = this.createHeaders();

  private http_headers = new HttpHeaders({
    'Authorization': `Basic ${this.credentials}`,
    'Content-Type': 'application/json'
  });

  private createHeaders(): HeadersInit {
    const headers = new Headers();
    headers.append('Origin', 'http://localhost:8000');
    headers.append('Authorization', `Basic ${this.credentials}`);
    return headers;
  }

  constructor(private http: HttpClient) {}

  getLoanData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/offers`, {headers: this.http_headers});
  }

  private apiUrl = 'http://localhost:8080/api/offers';

  fetchData() {
    return fetch(this.apiUrl, {
      method: 'GET',
      headers: this.headers
      // headers: {
      //   'Authorization': `Basic ${this.credentials}`
      // },
      // mode: 'no-cors'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Add methods for other CRUD operations (POST, PUT, DELETE) as needed.
}
