In the context of ExpressJS, **middleware refers to functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.** Middleware functions can perform tasks such as modifying request and response objects, terminating the request-response cycle, calling the next middleware function in the stack, or handling errors.

Middleware functions can be used to perform various tasks such as logging, authentication, authorization, parsing request bodies, error handling, and more. They are executed sequentially in the order they are defined within the Express application.

Middleware functions in ExpressJS are typically defined using the `app.use()` method, and they can be applied globally to all routes or to specific routes. They can also be chained together to create a pipeline of middleware functions that execute in sequence for each request.

**NOTE: Request handlers are also middleware!**


##### Initializing a middleware
```js
const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next(); //THIS IS IMPORTANT 
};
```

**Let's make a middleware for all types of Requests - Start by making a Index Resolver**
```js
const resolveIndexUserById = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex; // Set findUserIndex on request object
  next(); // Call next to move to the next middleware or route handler

}
```

##### Requests with Middleware...
```js
//GET WITH MIDDLEWARE

app.get("/api/users/:id", resolveIndexUserById, (request, response) => {  
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex]
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});
```

```js
//PUT WITH MIDDLEWARE
app.put("/api/users/:id", resolveIndexUserById, (request, response) => {
  const { body, findUserIndex } = request; // Destructure findUserIndex from request
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});
```

```js
//PATCH WITH MIDDLEWARE

app.patch("/api/users/:id", resolveIndexUserById, (request, response) => {
  const {body, findUserIndex} = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});
```

```js
//DELETE WITH MIDDLEWARE
app.delete("/api/users/:id", resolveIndexUserById, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});
```