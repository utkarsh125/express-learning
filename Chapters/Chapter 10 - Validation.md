### **Express Validator**
express-validator is a set of [express.js](http://expressjs.com/) middleware that wraps the extensive collection of validators and sanitizers offered by [validator.js](https://github.com/validatorjs/validator.js).

##### Installation and Import (.mjs)
```node
npm install express-validator
```

```js
import { query, validationResult } from "express-validator"
```

```js
//VALIDATION
app.get("/api/users/", query("filter").isString().notEmpty(), (request, response) => {
  console.log(request);
  const {
    query: { filter, value },
  } = request;
  if (filter && value)
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );
  
  return response.send(mockUsers);
});
```

You will see this in the console, express-validators attach it themselves.
```js
  'express-validator#contexts': [
    Context {
      fields: [Array],
      locations: [Array],
      stack: [Array],
      optional: false,
      bail: false,
      message: undefined,
      _errors: [Array],
      dataMap: [Map]
    }
  ],
```

```js
app.get("/api/users/", query("filter").isString().notEmpty(), (request, response) => {
console.log(request['express-validator#contexts']);
...
```

On changing the above lines of codes you can see this on the console.
```js
[
  Context {
    fields: [ 'filter' ],
    locations: [ 'query' ],
    stack: [ [CustomValidation], [StandardValidation] ],     
    optional: false,
    bail: false,
    message: undefined,
    _errors: [ [Object], [Object] ],
    dataMap: Map(1) { 'query:filter' => [Object] }
  }
]
```

Instead of that we can use validationResult() ---> Details in the code below
```js
app.get(
  "/api/users/",
  query("filter").isString().notEmpty(),//this is called the validation chain

  (request, response) => {
    const result = validationResult(request); //It will grab the field and and validate errors
    console.log(result);
    ...
```

After applying the above code you can see the errors in the terminal
```js
Running on PORT 3000
Result {
  formatter: [Function: formatter],
  errors: [
    {
      type: 'field',
      value: undefined,
      msg: 'Invalid value',
      path: 'filter',
      location: 'query'
    },
    {
      type: 'field',
      value: undefined,
      msg: 'Invalid value',
      path: 'filter',
      location: 'query'
    }
  ]
}
```

On passing a value to the filter `localhost:3000/api/users?filter=anson`
We get no errors since we have passed a String and it is NOT EMPTY.
```js
Result { formatter: [Function: formatter], errors: [] }
```

But on passing No filter we get ONE error since it is EMPTY as it is an Invalid value as shown below.
`localhost:3000/api/users?filter=`
```js
Result {
  formatter: [Function: formatter],
  errors: [
    {
      type: 'field',
      value: '',
      msg: 'Invalid value',
      path: 'filter',
      location: 'query'
    }
  ]
}
```

And on not including just the partial string `an` of `anson` in the URL `localhost:3000/api/user?filter=an` 
We get NO ERRORS
```js
Result { formatter: [Function: formatter], errors: [] }
```

Also, on leaving the `filter` without `=` gives ONE ERRORS (passing no value)
`localhost:3000/api/user?filter`
```js
Result {
  formatter: [Function: formatter],
  errors: [
    {
      type: 'field',
      value: '',
      msg: 'Invalid value',
      path: 'filter',
      location: 'query'
    }
  ]
}

```

**We can also pass in message by using `.withMessage('msg')`**
```js
app.get(
  "/api/users/",
  query("filter").isString().notEmpty().withMessage('Must not be empty').isLength({min: 3, max: 10}).withMessage('Must be at least 3-10 characters'),
  ...

```

```js
Result {
  formatter: [Function: formatter],
  errors: [
    {
      type: 'field',
      value: 'an',
      msg: 'Must be at least 3-10 characters',
      path: 'filter',
      location: 'query'
    }
  ]
}
```

You will get the errors if the filter is empty or if it does not satisfy the character requirement as it says "must be at least 3-10 characters".

#### The `body` validator

**Go to the `POST` Request Handler and `body()` middleware function**
```js
//POST Request

app.post("/api/users/", body(), (request, response) => {
  console.log(request.body);
  const { body } = request;
  const newUser = {
    //WE WANT TO GET THE LAST ELEMENT FROM THE ARRAY MOCKUSERS
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...body,
  };

  mockUsers.push(newUser);
  return response.status(201).send(newUser);

  // return response.send(200);

});
```

**Modifying the `body` tag**
```js
body("username")

    .notEmpty()

    .withMessage("username cannot be empty")

    .isLength({ min: 5, max: 32 })

    .withMessage("Username must be 5-32 characters")

    .isString()

    .withMessage("username must be string"),
```

The output on `POST` is
```js
POST - /api/users
Finished Logging...
Result {
  formatter: [Function: formatter],
  errors: [
    {
      type: 'field',
      value: undefined,
      msg: 'username cannot be empty',
      path: 'username',
      location: 'body'
    },
    {
      type: 'field',
      value: undefined,
      msg: 'Username must be 5-32 characters',
      path: 'username',
      location: 'body'
    },
    {
      type: 'field',
      value: undefined,
      msg: 'username must be string',
      path: 'username',
      location: 'body'
    }
  ]
}
```

#### Validating multiple fields

Instead of having to pass it in like this
```js
  body("username")

    .notEmpty()

    .withMessage("username cannot be empty")

    .isLength({ min: 5, max: 32 })

    .withMessage("Username must be 5-32 characters")

    .isString()

    .withMessage("username must be string"),
  body()...
```

**You can pass it using an array**
```js
  [body("username")

    .notEmpty()

    .withMessage("username cannot be empty")

    .isLength({ min: 5, max: 32 })

    .withMessage("Username must be 5-32 characters")

    .isString()

    .withMessage("username must be string"),

  

  body("displayName").notEmpty()

  ],
```

On passing this under `POST/Body`
```js
{
	"username":"anson",
	"displayName" : "Anson The Dev"
}
```

We get no errors
```js
Result { formatter: [Function: formatter], errors: [] }
{ username: 'anson', displayName: 'Anson the Dev' }
```

**NOTE: On passing just 1 field in `POST` will give you an error**

For example, omitting `username` will give you this
```js
Result {
  formatter: [Function: formatter],
  errors: [
    {
      type: 'field',
      value: undefined,
      msg: 'username cannot be empty',
      path: 'username',
      location: 'body'
    },
    {
      type: 'field',
      value: undefined,
      msg: 'Username must be 5-32 characters',
      path: 'username',
      location: 'body'
    },
    {
      type: 'field',
      value: undefined,
      msg: 'username must be string',
      path: 'username',
      location: 'body'
    }
  ]
}
{ displayName: 'Anson the dev' }
```

##### The `body` parameter from `request` can be valid or invalid, so if we want to add a validator we need to import `matchedData` from `express-validator`

```js
import { query, validationResult, body, matchedData } from "express-validator";

const data = matchedData(request);
    console.log(data); //DO THIS 
    const { body } = request; //INSTEAD OF THIS
```
![[Pasted image 20240408161629.png]]

Instead of making an array we can make a `validationSchema.mjs`
```js
export const createUserValidationSchema = {
    username: {
       isLength: {
        options:{
            min: 5,
            max: 32,
        },
        errorMessage: 'Username must have atleast 5-32 characters'
       },
       notEmpty: {
        errorMessage: "Username cannot be empty",
       },
       isString: {
        errorMessage: "Username must be a string!",
       }
    },
    displayName:{
        notEmpty: true
    }
}
```

And then import it in our main file
```js
import {createUserValidationSchema} from "./utils/validationSchema.mjs"
```

```js
app.post(

  "/api/users/",

  // [body("username")

  //   .notEmpty()

  //   .withMessage("username cannot be empty")

  //   .isLength({ min: 5, max: 32 })

  //   .withMessage("Username must be 5-32 characters")

  //   .isString()

  //   .withMessage("username must be string"),

  

  // body("displayName").notEmpty()

  // ],

  

  checkSchema(createUserValidationSchema),
  ...
```
