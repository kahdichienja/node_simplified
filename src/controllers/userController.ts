// controllers/userController.ts
import { Controller, Get } from '../core';

@Controller('/v1/api') // Decorate UserController with @Controller() and specify base route path
export class UserController {

    @Get('/users') // Decorate method with @Get() and specify route path
    getUsers() {
        // Controller logic to get users
        return ['Get all users']; // Placeholder response
    }
}