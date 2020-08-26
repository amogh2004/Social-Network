const express=require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

app.use(cors())
//parse application/xx
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
const port = 3000;
// bringing all routers
const user = require('./router/user');
const post = require('./router/post');
const auth = require('./router/auth');
const vote = require('./router/vote');
//db connection details
const DB = require('./config/db');
DB.socialNWDB.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  DB.socialNWDB.sync({})
  .then(() => {
      console.log('table creation successful')

    })
  .catch(()=>{
      console.log('table creation unsuccessful')
  })
})

.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//add routes to the app server

//user api
app.use('/api/user/',user);

//post api
app.use('/api/post/',post);

//auth api
app.use('/api/auth/',auth);

//vote api
app.use('/api/vote/',vote);

//application server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})  