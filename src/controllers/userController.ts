// controllers/userController.ts
import { NextFunction, Request, Response } from 'express'
import { Body, Controller, Get, Param, Post } from '../core';
import { RoleBasedAuth } from '../middleware/authMiddleware';
import { CreateUserDto } from '../utils';





@Controller() // Decorate UserController with @Controller() and specify base route path
export class UserController {

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
  saveUser(@Body() userDto: CreateUserDto, @Param() param: any) {

    console.log({
      param: param.params,
    });
    
    return userDto;
  }
}