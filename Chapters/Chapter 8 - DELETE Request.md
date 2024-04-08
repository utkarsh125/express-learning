This is pretty simple you just have to delete the elements by id and do not have to provide any Body 

```js
//DELETE

app.delete('/api/users/:id', (request, response) => {
  const{
    params: {id}
  } = request;
  const parsedId = parseInt(id);
  if(isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if(findUserIndex === -1) return response.sendStatus(404);
  mockUsers.splice(findUserIndex,1);
  return response.sendStatus(200);
})
```

![[Pasted image 20240407174455.png]]