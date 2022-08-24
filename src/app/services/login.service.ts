import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // generate token
  public generateToken = (loginData: any) => {
    return this.http.post(`${baseURL}/generate-token`, loginData);
  }

  // save token
  public saveToken = (token: any) => {
    localStorage.setItem('token', token);
    return true;
  }

  // check if user logged
  public isLoggedIn = () => {
    const tokenStr: string | null = localStorage.getItem("token")

    if(tokenStr == undefined || tokenStr == '' || tokenStr == null) return false;
    return true;
  }

  // logout
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("user");
    return true;
  }

  // get token
  public getToken = () => {
    return localStorage.getItem("token");
  }

  // set user details
  public setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  }

  // get user details
  public getUser = () => {
    let userStr = localStorage.getItem("user");

    if(userStr != null) {
      return JSON.parse(userStr);
    }

    this.logout();
    return null;
  }

  // get user role
  public getUserRole = () => {
    let user = this.getUser();
    return  user.authorities[0].authority;
  }
}
