import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import {getObjectCookie, getCookie, eraseCookie} from '../../app.utils';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public tokens: any;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Observable<any>}
   * 
   */
  public loginUser(email: string, password: string): Observable<any> {

      return this.http.post(`${environment.API_URL}/api/login`, { email, password });
        
  }

  
  public createTokenData(token: string): void {

    eraseCookie('auth_token');

    const objToken: any = JSON.parse(token);
    const expires: number = (typeof objToken === "object") ? objToken.token.expires_in : 21600;

    document.cookie = `auth_token=${token};Max-Age=${expires}`;

  }

  
  public createUserData(user: string): void {

    eraseCookie('auth_user_data');
    document.cookie = `auth_user_data=${user};Max-Age=21600`;

  }



  /**
   *
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {

    const tokenString: string = getCookie('auth_token') || '{}';
    const userString: string = getCookie('auth_user_data') || '{}';

    
    const token: any = JSON.parse(tokenString);
    const user: any = JSON.parse(userString);

    let result: boolean;

    if(token.token){
      result = true;
    }

    
    return result;

  }

  public logout(): void {

    eraseCookie('auth_token');
    eraseCookie('auth_user_data');

    this.router.navigate(['']);
    window.stop();

  }




  
  /**
   *
   * @returns {any}
   */
  public getToken(): any {

    const jsonData: any = getObjectCookie('auth_token');
    

    if (!(typeof jsonData === "object")) {

      eraseCookie('auth_token');
      this.router.navigate(['']);

    } else {

      return jsonData.token;

    }


  }

  /**
  *
  * @returns {Observable<any>}
  */
  public getUserAuthenticated(): Observable<any> {

    return this.http.post(`${environment.API_URL}/api/user`, {});

  }

  public getUserData(): any {
    var userData = getCookie('auth_user_data');
    return JSON.parse(userData);
  }

  // public getTokenData(): any {
  //   var token = JSON.parse(getCookie('auth_token'));
  //   return token.token;
  // }


  




}
