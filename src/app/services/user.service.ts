import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../utils/response.interface';
import { UserDto } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user';

  constructor(
    private Http:HttpClient
  ) { }

  me():Observable<Response<UserDto>>{
    return this.Http.get<Response<UserDto>>(`${this.apiUrl}/me`);
  }
}
