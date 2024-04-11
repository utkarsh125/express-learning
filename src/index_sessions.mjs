//CLEAN PORT of index_cookie.mjs

import express, { response } from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.mjs";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    //to make secret more secure you can use 'crypto' library
    secret: "Utkarsh the Dev", //make it more complicated, this is just an example
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, //ONE OUR LOGIN FOR OUR USER
    },
  })
);
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;

  response.cookie("hello", "world", { maxAge: 60000, signed: true });
  response.status(201).send({ msg: "Hello Session" });
});

app.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;

  const findUser = mockUsers.find((user) => user.username === username);

  if (!findUser || findUser.password !== password)
    return response.status(401).send({ msg: "BAD CREDENTIALS!" });

  request.session.user = findUser;
  //this should modify the session object
  //and that will have express-session set a cookie
  //and send it back to the browser/client as a response
  //now the server has that cookie, and now they can use that cookie
  //to send it to the server, and the server will know who's cookie it is!

  return response.status(200).send(findUser);
});

app.get("/api/auth/status", (request, response) => {
  request.sessionStore.get(request.session.id, (err, session) => {
    console.log(session);
  });

  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const { body: item } = request;

  const { cart } = request.session;

  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }

  return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  return response.send(request.session.cart ?? []); //if cart is undefined then return empty array
});
