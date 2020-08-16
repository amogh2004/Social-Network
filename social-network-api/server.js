const express=require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
const port = 3000;
const user = require('./router/user');
const post = require('./router/post');
const auth = require('./router/auth');

//db connection details
const DB = require('./config/db');
DB.socialNWDB.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  DB.socialNWDB.sync({ })
  .then(() => {
      console.log('table creation successful')

    })
  .catch(()=>{
      console.log('table creation unsuccessful')
  })
})

