import { Socket } from 'socket.io';

export function WebSocketGateway() {
  return function (target: any) {
    // Logic to handle WebSocket gateway registration
    function Constructable(this: any, client: Socket) {
      // Instantiate the target class with the provided client
      const instance = new target(client);

      // Subscribe to WebSocket events based on decorated methods
      const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
      methodNames.forEach((methodName) => {
        const handler = instance[methodName];
        if (typeof handler === 'function') {
          const eventName = Reflect.getMetadata('websocket-event', instance, methodName);
          if (eventName && client) { // Check if client exists before subscribing
            client.on(eventName, (data: any) => {
              handler.call(instance, client, data);
              console.log("sdkbvksd") 
            });
          }
        }
      });
    }

    // Set the prototype of the constructor function to match the target class
    Constructable.prototype = Object.create(target.prototype);
    return Constructable as any; // Ensure compatibility with TypeScript
  };
}



// Decorator for subscribing to WebSocket events
export function SubscribeMessage(eventName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Set metadata for the WebSocket event name
    Reflect.defineMetadata('websocket-event', eventName, target, propertyKey);
  };
}

export function RegisterWebsockets(controllerClasses: any[]) {
  return function (target: any) {
    // Logic to handle registration of WebSocket controllers
    controllerClasses.forEach((controllerClass) => {
      new controllerClass();

      console.log('==========WS Controllers===============');
      console.info(controllerClass.prototype);
      console.log('==========End WS Controllers===========');
    });
  } as any; // Return type is any to satisfy TypeScript
}

