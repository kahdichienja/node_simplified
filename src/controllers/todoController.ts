import { Request, Response } from 'express';
import { Controller, Delete, Get } from '../core';

@Controller()
export default class TodoController {

  @Get('/todos')
  getTodos() {
    return ['Get all todos']; // Placeholder response
  }

  @Delete('/todos/delete')
  delete() {
    return ['delete all todos']; // Placeholder response
  }

  @Get('/todo/:userId')
  getUserById(req: Request, res: Response) {
    const userId = req.params.userId; // Access request parameter

    return {
      userId
    };
  }
}
