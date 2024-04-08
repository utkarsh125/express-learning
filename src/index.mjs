import express, { response } from "express";
import { mockUsers } from "./utils/constants.mjs";

//we are going to use this as middleware
// import {
//   query,
//   validationResult,
//   body,
//   matchedData,
//   checkSchema,
// } from "express-validator";

// import { createUserValidationSchema } from "./utils/validationSchema.mjs";
// import { resolveIndexUserById } from "./utils/middlewares.mjs";

//IMPORT ROUTERS
// import usersRouter from "./routes/users.mjs";
// import productsRouter from "./routes/products.mjs";

const app = express();

//middleware

app.use(express.json());
// app.use(usersRouter); //REMOVE THE end-point definition app.get()
// app.use(productsRouter);

//Barrel-code for routers, Routers are imported in `routes/index.mjs`
import routes from "./routes/index.mjs";
app.use(routes);



// const loggingMiddleware = (request, response, next) => {
//   console.log(`${request.method} - ${request.url}`);
//   next();
// };

// const resolveIndexUserById = (request, response, next) => {
//   const {
//     params: { id },
//   } = request;
//   const parsedId = parseInt(id);
//   if (isNaN(parsedId)) return response.sendStatus(400);
//   const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
//   if (findUserIndex === -1) return response.sendStatus(404);
//   request.findUserIndex = findUserIndex; // Set findUserIndex on request object
//   next(); // Call next to move to the next middleware or route handler
// };

const PORT = process.env.PORT || 3000;

//IMPORTING THIS
// const mockUsers = [
//   { id: 1, username: "utkarsh", displayName: "Utkarsh" },
//   { id: 2, username: "anson", displayName: "Anson" },
//   { id: 3, username: "apoorva", displayName: "Apoorva" },
//   { id: 4, username: "sidharth", displayName: "Sidharth" },
//   { id: 5, username: "panduputra", displayName: "Panduputra" },
//   { id: 6, username: "brake", displayName: "Brake" },
//   { id: 7, username: "caustic", displayName: "Caustic" },
// ];

app.get(
  "/",
  (request, response, next) => {
    console.log("BASE URL 1");
    next();
  },
  (request, response, next) => {
    console.log("BASE URL 2");
    next();
  },
  (request, response, next) => {
    console.log("BASE URL 3");
    next();
  },
  (request, response) => {
    // response.send("HELLO RESPONSE!"); //PASSING PLAIN TEXT
    response.status(200).send({ msg: "Hello JSON" }); //PASSING JSON
    // response.status(201).send({ send: "Hello Status Code" }); //STATUS CODE
  }
);

//VALIDATION
// app.get(
//   "/api/users/",
//   query("filter")
//     .isString()
//     .notEmpty()
//     .withMessage("Must not be empty")
//     .isLength({ min: 3, max: 10 })
//     .withMessage("Must be at least 3-10 characters"), //This is called Validation chain
//   (request, response) => {
//     // console.log(request.query);
//     // console.log(request["express-validator#contexts"]);

//     const result = validationResult(request); //It will grab the field and and validate errors
//     console.log(result);
//     const {
//       query: { filter, value },
//     } = request;
//     //When filter and value are undefined.
//     // if(!filter && !value) return response.send(mockUsers)

//     if (filter && value)
//       return response.send(
//         mockUsers.filter((user) => user[filter].includes(value))
//       );

//     return response.send(mockUsers);
//     // response.send(mockUsers)
//   }
// );

// app.get("/api/users/", (request, response) => {
//   console.log(request.query);
//   const {
//     query: { filter, value },
//   } = request;
//   //When filter and value are undefined.
//   // if(!filter && !value) return response.send(mockUsers)

//   if (filter && value)
//     return response.send(
//       mockUsers.filter((user) => user[filter].includes(value))
//     );

//   return response.send(mockUsers);
//   // response.send(mockUsers)
// });

// app.use(loggingMiddleware, (request, response, next) => {
//   console.log("Finished Logging...");
//   next();
// });

//POST Request Validation
// app.post(
//   "/api/users/",
//   // [body("username")
//   //   .notEmpty()
//   //   .withMessage("username cannot be empty")
//   //   .isLength({ min: 5, max: 32 })
//   //   .withMessage("Username must be 5-32 characters")
//   //   .isString()
//   //   .withMessage("username must be string"),

//   // body("displayName").notEmpty()

//   // ],

//   checkSchema(createUserValidationSchema),

//   (request, response) => {
//     const result = validationResult(request);
//     console.log(result);

//     if (!result.isEmpty())
//       return response.status(400).send({ errors: result.array() });

//     const data = matchedData(request);

//     // console.log(data);
//     const { body } = request;
//     const newUser = {
//       //WE WANT TO GET THE LAST ELEMENT FROM THE ARRAY MOCKUSERS
//       id: mockUsers[mockUsers.length - 1].id + 1,
//       // ...body,
//       ...data,
//     };

//     mockUsers.push(newUser);
//     return response.status(201).send(newUser);
//     // return response.send(200);
//   }
// );
// //POST Request
// app.post("/api/users/", (request, response) => {
//   console.log(request.body);
//   const { body } = request;
//   const newUser = {
//     //WE WANT TO GET THE LAST ELEMENT FROM THE ARRAY MOCKUSERS
//     id: mockUsers[mockUsers.length - 1].id + 1,
//     ...body,
//   };

//   mockUsers.push(newUser);
//   return response.status(201).send(newUser);
//   // return response.send(200);
// });

//GET
// app.get("/api/users/:id", (request, response) => {
//   console.log(request.params);
//   const parsedId = parseInt(request.params.id);
//   console.log(parsedId);
//   if (isNaN(parsedId)) {
//     return response.status(400).send("Bad Request: Invalid ID...");
//   }

//   const findUser = mockUsers.find((user) => user.id === parsedId);
//   if (!findUser) return response.sendStatus(404);
//   return response.send(findUser);
// });

//GET WITH MIDDLEWARE
// app.get("/api/users/:id", resolveIndexUserById, (request, response) => {
//   const { findUserIndex } = request;
//   const findUser = mockUsers[findUserIndex];
//   if (!findUser) return response.sendStatus(404);
//   return response.send(findUser);
// });

// app.get("/api/products", (request, response) => {
//   response.send([
//     {
//       id: 123,
//       name: "milk",
//       price: "12.99",
//     },
//   ]);
// });

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

//PUT
// app.put("/api/users/:id", resolveIndexUserById, (request, response) => {
//   const { body } = request;
//   // const {
//   //   body,
//   //   params: { id },
//   // } = request;
//   // const parsedId = parseInt(id);
//   // if (isNaN(parsedId)) return response.sendStatus(400);
//   // const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
//   // if (findUserIndex === -1) return response.sendStatus(404);
//   // mockUsers[findUserIndex] = { id: parsedId, ...body };
//   mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body};
//   return response.sendStatus(200);
// });

//PUT WITH MIDDLEWARE
// app.put("/api/users/:id", resolveIndexUserById, (request, response) => {
//   const { body, findUserIndex } = request; // Destructure findUserIndex from request
//   // if (findUserIndex === undefined) {
//   //   // Check if findUserIndex is undefined
//   //   return response.sendStatus(500); // or some appropriate status code
//   // }

//   mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
//   return response.sendStatus(200);
// });

//PATCH
// app.patch("/api/users/:id", (request, response) => {
//   const {
//     body,
//     params: { id },
//   } = request;
//   const parsedId = parseInt(id);
//   if (isNaN(parsedId)) return response.sendStatus(400);

//   const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

//   if (findUserIndex === -1) return response.sendStatus(404);

//   mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
//   return response.sendStatus(200);
// });

//PATCH WITH MIDDLEWARE
// app.patch("/api/users/:id", resolveIndexUserById, (request, response) => {
//   const { body, findUserIndex } = request;

//   mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
//   return response.sendStatus(200);
// });

//DELETE
// app.delete("/api/users/:id", (request, response) => {
//   const {
//     params: { id },
//   } = request;

//   const parsedId = parseInt(id);

//   if (isNaN(parsedId)) return response.sendStatus(400);
//   const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

//   if (findUserIndex === -1) return response.sendStatus(404);
//   mockUsers.splice(findUserIndex, 1);

//   return response.sendStatus(200);
// });

//DELETE WITH MIDDLEWARE
// app.delete("/api/users/:id", resolveIndexUserById, (request, response) => {
//   const { findUserIndex } = request;
//   mockUsers.splice(findUserIndex, 1);
//   return response.sendStatus(200);
// });
//localhost:3000
//localhost:3000/users
//localhost:3000/products?key=value&key2=value2
