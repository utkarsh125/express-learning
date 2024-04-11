import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {

  console.log(request.headers.cookie);
  console.log(request.cookies);
  console.log(request.signedCookies.hello);
  
  // if(request.cookies.hello && request.cookies.hello === "world")
  if(request.signedCookies.hello && request.signedCookies.hello === "world")
    response.send([
      {
        id: 123,
        name: "milk",
        price: "12.99",
      },
    ]);
  
  return response.status(403).send({msg: "Sorry. you need to correct cookie!"});

  // response.send([
  //   {
  //     id: 123,
  //     name: "milk",
  //     price: "12.99",
  //   },
  // ]);
});

export default router;
