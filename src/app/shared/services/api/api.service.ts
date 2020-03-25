import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { AppSettings } from '../app-settings';

@Injectable()
export class ApiService {

  constructor(private http: HttpService) {
  }

  private getRequestHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  getUsers(): Promise<any> {
    return this.http.get<any[]>(`${AppSettings.BaseAPI}/User/Username/03425419005`, this.getRequestHeaders());
  }

  getAddress(cep: string): Promise<any> {
    return this.http.get(`http://viacep.com.br/ws/${cep}/json/`, null);
  }
}