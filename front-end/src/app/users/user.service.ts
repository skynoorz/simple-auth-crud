import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "./user";
import {Router} from "@angular/router";
import {catchError, map, tap} from "rxjs/operators";
import swal from "sweetalert2";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndpoint: string = 'http://localhost:8080/api/users';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) {
  }

  private isNotAuthorized(e: any): boolean {
    if (e.status == 401) {
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status == 403) {
      // this.router.navigate(['/login']);
      swal.fire("Error", "Access denied.", 'warning');
      return true;
    }
    return false;
  }

  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null)
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    return this.httpHeaders;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlEndpoint).pipe(
      catchError(e => {
        this.isNotAuthorized(e)
        return throwError(e);
      })
    );
  }

  getUsersPage(page: number): Observable<any> {
    return this.http.get(`${this.urlEndpoint}/page/${page}`, {headers: this.addAuthorizationHeader()}).pipe(
      tap(((response: any) =>{
        console.log('ServiceTap: 1');
        (response.content as User[]).forEach(user=>{
          console.log(user.username);
        })
      }))
    )
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlEndpoint}/${id}`, {headers: this.addAuthorizationHeader()})
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.urlEndpoint, user, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.error.message);
        swal.fire('Error', e.error.message, 'error')
        return throwError(e);
      })
    );
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${user.id}`, user, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.error.message);
        swal.fire('Error', e.error.message, 'error')
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.urlEndpoint}/${id}`, {headers: this.addAuthorizationHeader()});
  }

  getUsersContaining(username: string) :Observable<User[]>{
    return this.http.get<User[]>(`${this.urlEndpoint}/search/${username}`, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNotAuthorized(e)
        return throwError(e);
      })
    );
  }
}
