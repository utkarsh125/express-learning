import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";

//this function is responsible for actually taking that
//user object that we just validated and storing it in the session
passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);
  // done(null, user.id);
  done(null, user.username);
});

//
passport.deserializeUser((username, done) => {
  console.log(`Inside Deserializer`);
  // console.log(`Deserializing User ID: ${id}`);
  //search for the user either in the database or the array that we've created
  try {
    // const findUser = mockUsers.find((user) => user.id === id);
    const findUser = mockUsers.find((user) => user.username === username);
    if (!findUser) throw new Error("User not found!");
    done(null, findUser);

    //done(null, user) is used to signal successful authentication
    //and pass the authenticated user to the next step in the process.
  } catch (err) {
    //if the user is NOT found
    done(err, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    //main use is to validate the user
    //username and password
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found!");
      if (findUser.password !== password)
        throw new Error("Invalid credentials.");

      done(null, findUser);
    } catch (err) {
      //any errors will be catched by this catch block
      //we want to call the done function
      done(err, null);
    }
  }) //takes 3 arguments
);
