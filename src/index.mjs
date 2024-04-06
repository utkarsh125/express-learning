import express, { response } from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "utkarsh", displayName: "Utkarsh" },
  { id: 2, username: "anson", displayName: "Anson" },
  { id: 3, username: "apoorva", displayName: "Apoorva" },
  { id: 4, username: "sidharth", displayName: "Sidharth" },
  { id: 5, username: "panduputra", displayName: "Panduputra" },
  { id: 6, username: "brake", displayName: "Brake" },
  { id: 7, username: "caustic", displayName: "Caustic" },
  
];

app.get("/", (request, response) => {
  // response.send("HELLO RESPONSE!"); //PASSING PLAIN TEXT
  // response.send({msg: "Hello JSON"}); //PASSING JSON
  response.status(201).send({ send: "Hello Status Code" }); //STATUS CODE
});

app.get("/api/users/", (request, response) => {
    console.log(request.query)
    const { query: { filter, value }, } = request
    //When filter and value are undefined.
    // if(!filter && !value) return response.send(mockUsers)
    

    if(filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    )

    return response.send(mockUsers)
    // response.send(mockUsers)
});

app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if(isNaN(parsedId)){
        return response.status(400).send("Bad Request: Invalid ID...")
    }

    const findUser = mockUsers.find((user) => user.id === parsedId);
    if(!findUser) return response.sendStatus(404)
    return response.send(findUser)
})

app.get("/api/products", (request, response) => {
  response.send([
    {
      id: 123,
      name: "milk",
      price: "12.99",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

//localhost:3000
//localhost:3000/users
//localhost:3000/products?key=value&key2=value2


