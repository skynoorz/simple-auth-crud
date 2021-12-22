import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;


  constructor(private http: HttpClient) {
  }

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      // @ts-ignore
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      // @ts-ignore
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user: User): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credentials = btoa('bolivia' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credentials
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  saveUser(access_token: any) {
    let payload = this.getTokenData(access_token);
    this._user = new User();
    this._user.username = payload.user_name;
    // this._user.joining = payload.joining;
    // this._user.birthday = payload.birthday;
    // this._user.balance = payload.balance;
    this._user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(access_token: any) {
    this._token = access_token;
    sessionStorage.setItem('token', access_token);
  }

  getTokenData(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.getTokenData(this.token);
    return !!(payload != null && payload.user_name && payload.user_name.length > 0);
  }

  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
  }

  hasRole(role: string): boolean {
    return this.user.roles.includes(role);
  }
}
