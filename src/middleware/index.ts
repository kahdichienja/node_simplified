// middleware.ts
import 'reflect-metadata';
import express, { Request, Response, NextFunction, Express } from 'express';
import { HttpMethods } from '../core/httpInterceptDecorator';


function getCurrentDateTimeWithYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Adding 1 because January is 0-indexed
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function RegisterControllers(controllerClasses: any[], bootstrap: Express) {
  return function (target: any) {
    for (const controllerClass of controllerClasses) {

      const controllerInstance = new controllerClass();
      const controllerMethods = Object.getOwnPropertyNames(controllerInstance.constructor.prototype);
      for (const methodName of controllerMethods) {
        const path = Reflect.getMetadata('path', controllerInstance.constructor.prototype, methodName);
        const method = Reflect.getMetadata('method', controllerInstance.constructor.prototype, methodName);

        if (path && method) {
          console.log(`Registering route: ${method} ${path}`);

          bootstrap[method.toLowerCase() as HttpMethods](path, (req: Request, res: Response, next: NextFunction) => {
            controllerInstance[methodName](req, res, next);

            console.info(`[${getCurrentDateTimeWithYear()} Method->${method}->${path}]`);
          });
          console.info(`[Registered route: ${method} ${path}]`);

        } else {
          console.error(`Invalid method or path: ${method}, ${path}`);
        }
      }
    }
  };
}
