import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = false;
  private serverurl = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;


  constructor(private authService: AuthService,
              private httpClient: HttpClient) { }

     //  Login User with Email and Password
  loginUser(email: string, password: string): any {

    this.httpClient.post<ResponseModel>(`${this.serverurl}/auth/login`, {email, password})
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: ResponseModel) => {
        if (typeof (data) === 'string') {
          this.loginMessage$.next(data);
        } else {
          this.auth = data.auth;
          this.userRole = data.role;
          this.authState$.next(this.auth);
          this.userData$.next(data);
        }
      });
  }

  //  Google Authentication
  googleLogin(): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout(): any {
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }

  registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<{ message: string }> {
    const {fname, lname, email, password} = formData;
    console.log(formData);
    return this.httpClient.post<{ message: string }>(`${this.serverurl}/auth/register`, {
      email,
      lname,
      fname,
      typeOfUser,
      password,
      photoUrl: photoUrl || null
    });
  }
}

export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: number;
}
