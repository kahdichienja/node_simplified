// decorators.ts
import 'reflect-metadata';
import { Request, Response } from 'express';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export function Controller(baseRoute: string = '') {
  return function (target: Function) {
    Reflect.defineMetadata('baseRoute', baseRoute, target);
  };
}

// function createHttpDecorator(method: HttpMethod) {
//   return function (path: string) {
//     return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//       const originalMethod = descriptor.value;

//       descriptor.value = async function (req: Request, res: Response) {
//         console.log(req.body);
        
//         try {
//           const result = await originalMethod.call(this, req, res);

//           if (res.headersSent) {
//             return; // If headers already sent, do nothing
//           }

//           if (result === undefined) {
//             res.status(204).end();
//           } else {
//             res.json(result);
//           }
//         } catch (error) {
//           console.error(`Error in ${method} ${path}:`, error);
//           res.status(500).send('Internal Server Error');
//         }
//       };

//       Reflect.defineMetadata('path', path, target, propertyKey);
//       Reflect.defineMetadata('method', method, target, propertyKey);
//     };
//   };
// }

function createHttpDecorator(method: HttpMethod) {
  return function (path: string) {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = async function (req: Request, res: Response) {
        try {
          // Ensure the request body is properly parsed
          const body = req.body;

          // Call the original method with the request body
          const result = await originalMethod.call(this, body, req, res);


          if (!res.headersSent) {
            if (result === undefined) {
              res.status(204).end();
            } else {
              res.json(result);
            }
          }
        } catch (error) {
          console.error(`Error in ${method} ${path}:`, error);
          res.status(500).send('Internal Server Error');
        }
      };

      Reflect.defineMetadata('path', path, target, propertyKey);
      Reflect.defineMetadata('method', method, target, propertyKey);
    };
  };
}


export const Get = createHttpDecorator('GET');
export const Post = createHttpDecorator('POST');
export const Put = createHttpDecorator('PUT');
export const Delete = createHttpDecorator('DELETE');
export const Patch = createHttpDecorator('PATCH');

export function Body() {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const originalMethod = target[propertyKey];
    target[propertyKey] = function (...args: any[]) {
      const req: Request = args[0];
      const body = req.body;
      args[parameterIndex] = body;
      return originalMethod.apply(this, args);
    };
  };
}