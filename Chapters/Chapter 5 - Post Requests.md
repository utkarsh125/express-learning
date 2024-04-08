POST Requests are used to GET the data. Let's say there's a user form where the user fills the data like username, password and then clicks Sign in. ---> **In that case, it will make an API Request to the backend.** 

##### For better understanding we would need *Thunder Client*
- Go to VSCode/Extensions
- Search for Thunder Client
- Install it
- Click on *New Request*
- Type in the URL (in our case it is **localhost:3000/api/users**) *make sure npm run start:dev is running*.
![[Pasted image 20240407104213.png]]

##### A POST method is just like what we have been using till now syntax-wise
```js
app.post("/api/users/", (request, response) => {
  console.log(request.body);
  return response.send(200);
})
```

##### Now initialize a middleware (will be covered in later chapters) but for now we need it to understand POST requests
```js
//middleware
app.use(express.json())
```

##### Open ThunderClient and then go to the Body Tab and under the JSON Tab type 
```js
{
 "username" : "anson" // FOR EXAMPLE
}
```

and then click **SEND**
![[Pasted image 20240407105633.png]]

##### The Terminal should look something like this depending on the number of times you hit **SEND**

```js
{ username: 'anson' }
{ username: 'anson' }
{ username: 'anson' }
{ username: 'anson' }
```

You can add multiple fields or tags in the JSON, e.g,
![[Pasted image 20240407124710.png]]

```js
{ username: 'anson', displayName: 'Anson The Dev' }
{ username: 'anson', displayName: 'Anson The Dev' }
{ username: 'anson', displayName: 'Anson The Dev' }
```

