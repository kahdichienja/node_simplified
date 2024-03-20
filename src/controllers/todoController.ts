// controllers/userController.ts
import { Request, Response } from 'express';
import { Controller, Get } from '../core';

@Controller() // Decorate UserController with @Controller() and specify base route path
export default class TodoController {
  @Get('/todos') // Decorate method with @Get() and specify route path
  getUsers(req: Request, res: Response) {
    // Controller logic to get users
    res.send('Get all todos'); // Placeholder response
  }
}
