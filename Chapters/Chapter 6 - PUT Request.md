It is used to update data just like patch but differently.
`PATCH` is used to apply partial updates to a resource, meaning that only the fields that need to be changed are sent in the request body. `PUT` is used to replace the entire resource with a new representation, meaning that all the fields of the resource are sent in the request body, even if they are not modified.

#### Explanation
`PUT()` is for the entire record, meaning that we need to specify all arguments.
e.g.
```js
{ id: 1, username: "utkarsh", displayName: "Utkarsh" }
```

**If I used `PUT` then I have to specify both the arguments, if I do not specify it, the data will be overridden** - *to solve that problem we use `PATCH()`*


```js
//PUT

app.put("/api/users/:id", (request, response) => {
  const {
    body, params: { id },
  } = request;
  const parsedId = parseInt(id);
  if(isNaN(parsedId)) return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if(findUserIndex === -1) return response.sendStatus(404);

  mockUsers[findUserIndex] = { id: parsedId, ...body }

  return response.sendStatus(200)

})
```

At `localhost:3000/api/user/2` the previous data was
```js
{ id: 2, username: "anson", displayName: "Anson" }
```

Now after using `PUT` on it with new Data, that ID is overridden (id:2).
![[Pasted image 20240407141622.png]]