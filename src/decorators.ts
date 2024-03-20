// decorators.ts
import 'reflect-metadata';
import { Request, Response } from 'express';

export interface ControllerContext {
  req: Request;
  res: Response;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

function createHttpDecorator(method: HttpMethod) {
  return function (path: string) {
    return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = function (this: ControllerContext, req: Request, res: Response) {
        const result = originalMethod.call(this, req, res);
        return result;
      };

      Reflect.defineMetadata('path', path, target, propertyKey);
      Reflect.defineMetadata('method', method, target, propertyKey);
      return descriptor;
    };
  };
}

export const Get = createHttpDecorator('GET');
export const Post = createHttpDecorator('POST');
export const Put = createHttpDecorator('PUT');
export const Delete = createHttpDecorator('DELETE');
export const Patch = createHttpDecorator('PATCH');

export function Controller() {
  return function (target: Function) {
    const controllers = Reflect.getMetadata('controllers', Reflect) || [];
    controllers.push(target);
    Reflect.defineMetadata('controllers', controllers, Reflect);
  };
}
