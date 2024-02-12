import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { Response } from '../utils/response.interface';
import { UserDto } from '../models/user.dto';

export const UserResolver: ResolveFn<Response<UserDto>> = (route, state) => {
  const userService: UserService = inject(UserService);
  return userService.me();
};
