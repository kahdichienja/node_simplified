// controllers/userController.ts
import { Controller, Get } from '../core';
import { Request, Response } from 'express';

@Controller() // Decorate UserController with @Controller() and specify base route path
export default class UserController {
  @Get('/users') // Decorate method with @Get() and specify route path
  getUsers(req: Request, res: Response) {
    // Controller logic to get users
    res.send('Get all users'); // Placeholder response
  }
}
