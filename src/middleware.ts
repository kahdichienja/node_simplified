// middleware.ts
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import UserController from './controllers/userController'; // Import UserController

export function RegisterControllers() {
  return function (target: any) {
    const controllers = Reflect.getMetadata('controllers', Reflect) || [];
    // Push UserController to the controllers array
    controllers.push(UserController);
    for (const controller of controllers) {
      const controllerInstance = new controller();
      const controllerMethods = Object.getOwnPropertyNames(controllerInstance.constructor.prototype);
      for (const methodName of controllerMethods) {
        const path = Reflect.getMetadata('path', controllerInstance.constructor.prototype, methodName);
        const method = Reflect.getMetadata('method', controllerInstance.constructor.prototype, methodName);
        if (path && method) {
          target.app[method.toLowerCase()](path, (req: Request, res: Response, next: NextFunction) => {
            controllerInstance[methodName](req, res, next);
          });
        }
      }
    }
  };
}
