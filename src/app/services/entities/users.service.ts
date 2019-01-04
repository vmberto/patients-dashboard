import { HttpClient } from '@angular/common/http';
import { CrudMethods } from 'src/app/helpers/crud/crud-methods';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudMethods {
  protected entity = 'users';

  constructor(public http: HttpClient) {
    super();
   }
}
