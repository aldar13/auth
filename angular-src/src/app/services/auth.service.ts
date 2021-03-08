import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

export interface us1{
  username;
  password;
}

export interface us2{
  name;
      email;
      username;
      password;
}

export interface Configu{
  id;
  name;
  username;
  email;
}

export interface Config {
  success;
  token;
  user:Configu;
  msg;
}

export interface Config2 {
  user:Configu;
}

@Injectable()
export class AuthService {
  authToken: any;
  user: us1;

  constructor(private http: HttpClient) {}

  registerUser(user:us2) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Config>('users/register', user, {headers: headers})
  }

  authenticateUser(user:us1) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Config>('users/authenticate', user, {headers: headers})
  }

  getProfile() {
    this.loadToken();
    var header = {headers : new HttpHeaders().set('Authorization', "Bearer"+this.authToken)}
    return this.http.get<Config2>('users/profile', header)
  }

  storeUserData(token, user:us2) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return this.authToken;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
