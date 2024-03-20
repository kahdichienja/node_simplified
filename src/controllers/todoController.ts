import { Request, Response } from 'express';
import { Controller, Get } from '../core';

@Controller() // Decorate UserController with @Controller() and specify base route path
export default class TodoController {
  @Get('/todos') // Decorate method with @Get() and specify route path
  getUsers() {
    // Controller logic to get users

    return ['Get all todos']; // Placeholder response
  }

  @Get('/users/:userId') // Decorate method with @Get() and specify route path with parameter
  getUserById(req: Request, res: Response) {
      const userId = req.params.userId; // Access request parameter
      // Controller logic to get user by ID
      return {
        userId
      };
  }
}
