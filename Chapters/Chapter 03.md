
This is how you specify a Route Param.
```js
app.get('/api/users/:id', (request, response) => {
    console.log(request.params)
})
```

On running the script ```npm run start:dev``` and then visiting ```api/users/1``` the output was
```js
Running on PORT 3000
{ id: '1' }
```

### Create a function called mockUsers
```js
const mockUsers = [
  { id: 1, username: "utkarsh", displayName: "Utkarsh" },
  { id: 2, username: "anson", displayName: "Anson" },
  { id: 3, username: "apoorva", displayName: "Apoorva" },
  { id: 4, username: "sidharth", displayName: "Sidharth" },
];
```

We also need to pass the above array as a response.
```js
app.get("/api/users/", (request, response) => {
  response.send(mockUsers);
});
```

**Some more things, as you seen that the id returns a string
so for that we can do something like this
```js
app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
})
```

visiting ```/api/users/aabada``` you get something like this on the terminal
```js
Running on PORT 3000
{ id: 'aabada' }
NaN ---> stands for NOT an INTEGER
```

Modifying the code up above [1 code stacks above]
```js
app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if(isNaN(parsedId)){ //If NaN return status Code 400 and print msg
        return response.status(400).send("Bad Request: Invalid ID...")
    }
    //a function to find the user if it exists in the array
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if(!findUser) return response.sendStatus(404) //if wrong ID then return 404
    return response.send(findUser) //else return user
})
```

On visiting the existing IDs which were present in ```mockUsers``` variable the entire element was printed.
```js
{"id":4,"username":"sidharth","displayName":"Sidharth"}
```
else it messaged "Not Found"
```js
Not Found // along with a 404 code on the browser console error tab.
```