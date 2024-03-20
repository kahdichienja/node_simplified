// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// Define your role-based authentication middleware
export function roleBasedAuthMiddleware(allowedRoles: string[]) {
    return function(req: Request, res: Response, next: NextFunction) {
        // Get user role from request object (e.g., req.user.role)
        const userRole = 'manager'; // Assuming user role is stored in req.user.role
        
        if (!userRole || !allowedRoles.includes(userRole)) {
            // User does not have the required role, deny access
            return res.status(403).send({message: 'Forbidden'});
        }
        
        // User has the required role, allow access
        next(); // Call the next middleware or route handler
    };
}


// Modify the decorator to return a decorator function
export function RoleBasedAuth(allowedRoles: string[]) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(req: Request, res: Response, next: NextFunction) {
            // Call the role-based authentication middleware
            roleBasedAuthMiddleware(allowedRoles)(req, res, () => {
                // Call the original controller method if authentication succeeds
                originalMethod.call(this, req, res, next);
            });
        };
        return descriptor;
    };
}

