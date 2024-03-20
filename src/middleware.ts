// middleware.ts
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';

export function RegisterControllers(controllerClasses: any[]) {
  return function (target: any) {
    for (const controllerClass of controllerClasses) {
      const controllerInstance = new controllerClass();
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
