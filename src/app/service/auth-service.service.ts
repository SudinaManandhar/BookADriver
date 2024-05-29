import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

interface Users{
  id: number,
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl="http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<Users[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        return !!user;  
      })
    );
  }
}
