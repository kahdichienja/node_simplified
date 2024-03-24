// controllers/userController.ts
import { Request, Response } from 'express'
import { RequestBody, ClassController, Get,RequestParam, Post } from '../core';
import { RoleBasedAuth } from '../middleware/authMiddleware';
import { CreateUserDto } from '../utils';
import { UserService } from '../service/userService';





@ClassController() // Decorate UserController with @Controller() and specify base route path
export class UserController {

  constructor(private readonly authService: UserService){
    this.authService = new UserService
  }

  @Get('/users') // Decorate method with @Get() and specify route path
 
  getUsers(@RoleBasedAuth(['admi', 'ager']) req: Request, res: Response) {
    // Controller logic to get users
    return ['Get all users']; // Send t
  }
  @Get('/user') // Decorate method with @Get() and specify route path
  getUser() {
    // Controller logic to get users
    return ['Get  user']; // Send t
  }
  @Post('/user/:id')
  saveUser(@RequestBody() userDto: CreateUserDto, @RequestParam() param: any) {

    // console.log({
    //   param: param.params,
    // });
    
    return this.authService.getUser(userDto);
  }
}