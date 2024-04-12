//CLEAN PORT of index_sessions.mjs

import express, { response } from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.mjs";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";
import passport from "passport";
import mongoose from "mongoose";
import "./strategies/local-strategy.mjs";

const app = express();

const password = "passwordgen4";

// mongoose.connect("mongodb://localhost:27017")
//it uses this port by default, but
//you must specify it if it is different for your case

mongoose
  // .connect("mongodb://localhost/express-learning")
  .connect(`mongodb+srv://utkarshtest:${password}@cluster0.bdjum7w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err}`);
  });



  

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

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  response.sendStatus(200);
});

app.get("/api/auth/status", (request, response) => {
  console.log(`Inside /auth/status endpoint`);
  console.log(request.user);
  console.log(request.session);

  return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);

  request.logout((err) => {
    if (err) return response.sendStatus(400);
    response.send(200);
  });
});

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
  console.log(`Inside /auth/status endpoint`);
  console.log(request.user);

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
