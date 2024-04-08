In order to fix the data overriding issue that occurs when using `PUT` request. `PATCH` requests are used. 
`PATCH` is used to apply partial updates to a resource, meaning that only the fields that need to be changed are sent in the request body. 

```js
//PATCH

app.patch('/api/users/:id', (request, response) => {

  const {body, params: {id},} = request;

  const parsedId = parseInt(id);

  if(isNaN(parsedId)) return response.sendStatus(400);

  

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)

  

  if(findUserIndex === -1) return response.sendStatus(404);

  

  mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};

  return response.sendStatus(200);

})
```

Remember, there is a case of **overridding in `PUT`** but not in `PATCH`
So you can change single values, without affecting others
![[Pasted image 20240407173139.png]]
