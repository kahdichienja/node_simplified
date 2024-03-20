// controllers/userController.ts
import { Request, Response } from 'express'
import { Body, Controller, Get, Post } from '../core';
import { RoleBasedAuth } from '../middleware/authMiddleware';
import {CreateUserDto}  from '../utils';



@Controller() // Decorate UserController with @Controller() and specify base route path
export class UserController {

  @Get('/users') // Decorate method with @Get() and specify route path
  // @RoleBasedAuth(['admin', 'manager'])
  getUsers() {
    // Controller logic to get users
    return ['Get all users']; // Send t
  }
  @Get('/user') // Decorate method with @Get() and specify route path
  getUser() {
    // Controller logic to get users
    return ['Get  user']; // Send t
  }
  @Post('/user')
  saveUser(@Body() userDto: CreateUserDto) {
    return userDto; 
  }
}