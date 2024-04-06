#### Current Code
```js
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})
```

##### A litte guide to routing
```js
//localhost:3000
//localhost:3000/users
//localhost:3000/products
```

#### Making a get() function
```js
app.get('/', (request, response) => {
	response.send("Hello Response");
})
```

```request```: specifies the incoming HTTP requests from client side to the server side
```response```: What you can use to modify the response to send back to the user, you can send back text, image, HTML, or a JSON object.

*Here are some more examples of what else you can pass*
```js
app.get('/', (request, response) => {
    // response.send("HELLO RESPONSE!"); //PASSING PLAIN TEXT
    // response.send({msg: "Hello JSON"}); //PASSING JSON
    response.status(201).send({send:"Hello Status Code"}); //STATUS CODE
})
```

**Check the network element (inspect element) and you will see something like this**
![[Pasted image 20240405171844.png]]

Some more examples are in the code below
```js
app.get('/api/users', (request, response) => {
    response.send([
        {id: 1, username: 'utkarsh', displayName: "Utkarsh"},
        {id: 2, username: 'anson', displayName: "Anson"},
        {id: 3, username: 'apoorva', displayName: "Apoorva"},
        {id: 4, username: 'sidharth', displayName: "Sidharth"},
    ])
})
app.get('/api/products', (request, response) => {
    response.send([
        {
            id: 123, name: 'chicken breast', price: '12.99'
        }
    ])
})
```

visiting ```api/users/ ``` or ```api/products/``` will give you information that you stored inside their respective get() functions.