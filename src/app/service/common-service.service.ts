import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';

interface Users{
  id: number,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class CommonServiceService {
  
  isLoggedIn: boolean = false;
  
  private apiUrl="http://localhost:3000/users";

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Users[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        this.isLoggedIn == !!user;
        return !!user;  
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigateByUrl("/login");
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
