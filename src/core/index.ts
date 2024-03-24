import { createHttpDecorator, Body, Param, Controller } from "./httpInterceptDecorator";


export const Get = createHttpDecorator('GET');
export const Post = createHttpDecorator('POST');
export const Put = createHttpDecorator('PUT');
export const Delete = createHttpDecorator('DELETE');
export const Patch = createHttpDecorator('PATCH');
export const RequestBody = Body;
export const RequestParam = Param;
export const ClassController = Controller;
