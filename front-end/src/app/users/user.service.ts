import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndpoint: string = 'http://localhost:8080';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlEndpoint + "/api/users");
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlEndpoint}/api/users/${id}`)
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.urlEndpoint + "/api/users", user, {headers: this.httpHeaders});
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/api/users/${user.id}`, user, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.urlEndpoint}/api/users/${id}`, {headers: this.httpHeaders});
  }
}
