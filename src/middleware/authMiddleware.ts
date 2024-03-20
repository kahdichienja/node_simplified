// // middleware/authMiddleware.ts
// import { Request, Response, NextFunction } from 'express';

// // Define your role-based authentication middleware
// export function roleBasedAuthMiddleware(allowedRoles: string[]) {
//   return function (req: Request, res: Response, next: NextFunction) {
//     // Get user role from request object (e.g., req.user.role)
//     const userRole = 'manager'; // Assuming user role is stored in req.user.role

//     if (!userRole || !allowedRoles.includes(userRole)) {
//       // User does not have the required role, deny access
//       return res.status(403).send({ message: 'Forbidden' });
//     }

//     // User has the required role, allow access
//     next(); // Call the next middleware or route handler
//   };
// }


// // Modify the decorator to return a decorator function
// export function RoleBasedAuthx(allowedRoles: string[]) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
//       // Call the role-based authentication middleware
//       roleBasedAuthMiddleware(allowedRoles)(req, res, () => {
//         // Call the original controller method if authentication succeeds
//         originalMethod.call(this, req, res, next);
//       });
//     };
//     return descriptor;
//   };
// }
// // Modify the decorator to return a decorator function

// // Modify the decorator to return a decorator function
// export function RoleBasedAuth(allowedRoles: string[]) {

//   return function (target: any, propertyKey: string | symbol, parameterIndex: number) {

//     return function (req: Request, res: Response, next: NextFunction) {
//       // Get user role from request object (e.g., req.user.role)
//       const userRole = 'manager'; // Assuming user role is stored in req.user.role

//       if (!userRole || !allowedRoles.includes(userRole)) {
//         // User does not have the required role, deny access
//          res.status(403).send({ message: 'Forbidden' });
//       }




//       const originalMethod = target[propertyKey];
//       target[propertyKey] = function (...args: any[]) {





//         const req: Request = args[0];
//         const res: Response = args[1];
//         const body = req.body;



//         args[parameterIndex] = body;
//         // User has the required role, allow access
//         next(); // Call the next middleware or route handler
//          originalMethod.apply(this, args);
//       };
//     };
//   }

// }


// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// middleware/authMiddleware.ts

// Define your role-based authentication middleware
function roleBasedAuthMiddleware(allowedRoles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    // Get user role from request object (e.g., req.user.role)
    const userRole = 'manager'; // Assuming user role is stored in req.user.role

    if (!userRole || !allowedRoles.includes(userRole)) {
      // User does not have the required role, deny access
      return res.status(403).send({ message: 'Forbidden' });
    }

    // User has the required role, allow access
    next(); // Call the next middleware or route handler
  };
}

// Wrapper function to apply the decorator to the method parameter
export function RoleBasedAuth(allowedRoles: string[]) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
      // No need to modify the target or propertyKey here
      // Instead, we should modify the method descriptor to apply the decorator to the specified parameter index
      const originalMethod = target[propertyKey];
      
      // Replace the original method with a new one that applies the decorator to the specified parameter
      target[propertyKey] = function (...args: any[]) {
          const req = args[parameterIndex]; // Get the request object from the specified parameter index
          const res = args[parameterIndex + 1]; // Assuming the response object is next in the parameters list
          const next = args[parameterIndex + 2]; // Assuming the next function is after the response object

          roleBasedAuthMiddleware(allowedRoles)(req, res, next); // Apply the decorator

          // Call the original method with the modified arguments
          return originalMethod.apply(this, args);
      };
  };
}


