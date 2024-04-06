##### Setting up the folder
Open CMD/Powershell and make a new directory

```
mkdir express-learning
```

##### Installing the base file (Package.json)
```
npm init -y
```

##### Installing ExpressJS
```
npm i express
```

##### Installing Nodemon
We need this because Nodemon helps us to view things in real-time. Install it as a DevDependency
```
npm install -D nodemon
```

**After installing everything make sure you make the following changes in the package.json**

```js
{

  "name": "express-learning",

  "version": "1.0.0",

  "description": "*It contains all the things that were learned during the length of the course*",

  "main": "index.mjs",

  "scripts": {

    "test": "echo \"Error: no test specified\" && exit 1",

    "start:dev" : "nodemon ./src/index.mjs",

    "start" : "node ./src/index.mjs"

  },

  "keywords": [],

  "author": "",

  "license": "ISC",
