// controllers/userController.ts
import { Request, Response } from 'express'
import { Controller, Get } from '../core';
import { RoleBasedAuth } from '../middleware/authMiddleware';



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
}