import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getRequestHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Promise<User> {
    return this.http.post<User>(`${AppSettings.BaseAPI}/Auth/Authenticate`, { username, password }, this.getRequestHeaders())
      .then((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  createPassword(token: string, password: string): Promise<any> {
    return this.http.post<any[]>(`${AppSettings.BaseAPI}/User/NewPassword`, { token, password }, this.getRequestHeaders());
  }
}
