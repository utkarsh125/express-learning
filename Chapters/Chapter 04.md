QueryParams is a way to provide a key value pair such that it can fetched directly using the URL [Look at the defintion online]

```
//localhost:3000/products?key=value&key2=value2
```
You can send Query Parameters from one page to another page on client side that way you can send data across different pages

You are making a HTTP Request in a Read-Only format, you are not manipulating any data on the server side.

But in some cases let's say you have to retrieve some data but you want it sorted in some order; for example
```js
const mockUsers = [
  { id: 1, username: "utkarsh", displayName: "Utkarsh" },
  { id: 2, username: "anson", displayName: "Anson" },
  { id: 3, username: "apoorva", displayName: "Apoorva" },
  { id: 4, username: "sidharth", displayName: "Sidharth" },
  { id: 5, username: "panduputra", displayName: "Panduputra" },
  { id: 6, username: "brake", displayName: "Brake" },
  { id: 7, username: "caustic", displayName: "Caustic" },
];
```

So you'd use a **query string filter** for that. 

Make changes in the `get()` function
```js
app.get("/api/users/", (request, response) => {
    console.log(request.query)
    response.send(mockUsers)
});
```

Try visiting ```http://localhost:3000/api/users?filter=anson``` and then look at the console you will see something like this - meaning that on requesting a filter the query string is parsed into a JSON object by Express.
```js
Running on PORT 3000
{ filter: 'anson' }
```

Pairing it with a key value filter is will also give you the parameters
`http://localhost:3000/api/users?filter=username&value=an`

```js
{ filter: 'username', value: 'an' }
```


Make some more changes so that you can fetch the key value pairs of the `mockUsers` array
```js
app.get("/api/users/", (request, response) => {
    console.log(request.query)
    const { query: { filter, value }, } = request
    
    //When filter and value are undefined.
    if(!filter && !value) return response.send(mockUsers)

   //When filter and value are defined then
    if(filter && value) return response.send(
    //This will grab all of the user objects that pass this predicate
    //OR if the username includes the value that we're trying to filter then it's going return that into a new array 
        mockUsers.filter((user) => user[filter].includes(value))

    )

  //and once all the filtering is done we are going to send the entire  array back.
    response.send(mockUsers)

});
```

**Let's filter by username `/user?filter=username`** *It only has a filter and no value, in that case you will notice that it does not return anything yet* 

-- So in that case you need to provide a key-value pair
`/api/users?filter=username&value=an`
Now as you can see that this will grab all of the users that have `'an'` in the username
```js
[{"id":2,"username":"anson","displayName":"Anson"},{"id":5,"username":"panduputra","displayName":"Panduputra"}]
```

-- Now do the same for username that has `e` as a substring
`api/users?filter=username&value=e`

Now let's wrap-up by fixing a few lines of the code, instead of doing this
```js
if(!filter && !value) return response.send(mockUsers)
```
We can do this
```js
return response.send(mockUsers)

    // response.send(mockUsers)
```