//CLEAN PORT of index_old_mjs

import express, { response } from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.mjs";
import session from "express-session";

const app = express();

app.use(express.json());
// app.use(cookieParser('secret'));
// app.use(cookieParser());
app.use(cookieParser("helloworld"));
app.use(session(
  {
    //to make secret more secure you can use 'crypto' library
    secret: 'Utkarsh the Dev', //make it more complicated, this is just an example
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, //ONE OUR LOGIN FOR OUR USER
    },
  }
));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) =>{
//   response.cookie('hello','world', {maxAge: 10000});
  response.cookie('hello','world', {maxAge: 30000, signed: true});
  response.status(201).send({msg: "Hello Cookie!"})
})

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
