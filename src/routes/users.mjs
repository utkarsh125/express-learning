import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
  body,
} from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { resolveIndexUserById } from "../utils/middlewares.mjs";

const router = Router(); //Defining the router

router.get(
  "/api/users/",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters"), //This is called Validation chain
  (request, response) => {

    console.log(request.session);
    console.log(request.session.id);
    (request.sessionStore.get(request.session.id, (err, sessionData) =>{
      if(err){
          console.log(err);
          throw err;
      }
      console.log(sessionData);
  }))

    const result = validationResult(request); //It will grab the field and and validate errors
    console.log(result);
    const {
      query: { filter, value },
    } = request;
    if (filter && value)
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );
    return response.send(mockUsers);
  }
);

router.get("/api/users/:id", resolveIndexUserById, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

router.post(
  "/api/users/",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });
    const data = matchedData(request);
    // console.log(data);
    const { body } = request;
    const newUser = {
      //WE WANT TO GET THE LAST ELEMENT FROM THE ARRAY MOCKUSERS
      id: mockUsers[mockUsers.length - 1].id + 1,
      // ...body,
      ...data,
    };

    mockUsers.push(newUser);
    return response.status(201).send(newUser);
    // return response.send(200);
  }
);

router.put("/api/users/:id", resolveIndexUserById, (request, response) => {
  const { body, findUserIndex } = request; // Destructure findUserIndex from request
  // if (findUserIndex === undefined) {
  //   // Check if findUserIndex is undefined
  //   return response.sendStatus(500); // or some appropriate status code
  // }

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexUserById, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexUserById, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;
