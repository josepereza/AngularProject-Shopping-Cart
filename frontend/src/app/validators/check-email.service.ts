import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { timer, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {

  serverurl = environment.SERVER_URL;

  constructor(private httpClient: HttpClient) { }

  searchEmail(text): any {
    return timer(2000)
      .pipe(
        switchMap(() => this.httpClient.get(`${this.serverurl}/users/validate/${text}`)),
      ); // PIPE ENDS HERE
  }


  emailValidate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      console.log(control.value);
      return this.searchEmail(control.value)
        .pipe(
          map((res: { message: string, status: boolean, user: object }) => {
            if (res.status) {
              return {taken: true};
            }
            return null;
          })
        ); // PIPE ENDS HERE
    };
  }
}
