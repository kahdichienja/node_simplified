import { Server, Socket } from 'socket.io';

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

 

export function RegisterWebsockets(websocketInstance: Server, controllerClasses: any[]) {
  return function (target: any) {
    // Logic to handle registration of WebSocket controllers
    target.prototype.websocketInstance = websocketInstance; // Attach the WebSocket instance to the class prototype
    console.log('WebSocket instance attached to class:', target.name);

    // Initialize WebSocket controllers with the WebSocket instance
    const controllerPromises = controllerClasses.map(
      (controllerClass: any) => new Promise((resolve, reject) => {
        websocketInstance.on('connection', (socket) => {
          target.prototype.client = socket;
          const cnt = new controllerClass(socket, websocketInstance);
          console.log(`Socket connected: ${socket.id}`);
          socket.on('disconnect', () => {
            console.log(`WebSocket client disconnected: ${socket.id}`);
          });
          resolve(cnt); // Resolve the promise with the initialized controller
        });
      })
    );

    // Wait for all controller promises to resolve
    Promise.all(controllerPromises)
      .then((controllers) => {
        console.log('WebSocket controllers registered:', controllers.map((c: any) => c.constructor.name));
      })
      .catch((error) => {
        console.error('Error initializing WebSocket controllers:', error);
      });
  } as any; // Return type is any to satisfy TypeScript
}




