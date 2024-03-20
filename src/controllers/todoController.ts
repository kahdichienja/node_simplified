
import { Controller, Get } from '../core';

@Controller() // Decorate UserController with @Controller() and specify base route path
export default class TodoController {
  @Get('/todos') // Decorate method with @Get() and specify route path
  getUsers() {
    // Controller logic to get users
    return ['Get all todos']; // Placeholder response
  }
}
