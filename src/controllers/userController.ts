// controllers/userController.ts
import { Request, Response } from 'express'
import { Body, Controller, Get, Post } from '../core';
import { RoleBasedAuth } from '../middleware/authMiddleware';
import {CreateUserDto}  from '../utils';



@Controller() // Decorate UserController with @Controller() and specify base route path
export class UserController {

  @Get('/users') // Decorate method with @Get() and specify route path
  @RoleBasedAuth(['admin', 'manager'])
  getUsers(req: Request, res: Response) {
    // Controller logic to get users
    return res.send(['Get all users']); // Send t
  }
  @Get('/user') // Decorate method with @Get() and specify route path
  getUser() {
    // Controller logic to get users
    return ['Get  user']; // Send t
  }
  @Post('/user')
  saveUser(@Body() userDto: CreateUserDto,  req: Request, res: Response) {
   
    console.log(req.headers); // Log Content-Type header
    console.log(req.body); // Log request body
    console.log(userDto.first_name);

    return {firstname: userDto.first_name}; 
  }
}