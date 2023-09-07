import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';import { Observable, map, tap } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';
 '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private http = inject( HttpClient );
  private baseUrl = 'https://reqres.in/api/users';

  getUserById( id: number ): Observable<User> {

    return this.http.get<SingleUserResponse>(`${ this.baseUrl }/${id}`)
      .pipe(
        map( response => response.data),
        tap( console.log )
      );
  }
  
}
