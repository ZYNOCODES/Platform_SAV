require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const sequelize = require('./config/database');
const PannesRoute = require('./routes/PannesRoute');
const UserRoute = require('./routes/users');

const port = process.env.PORT || 8080;

//express app
const app = express();
 
//midleware
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/Pannes', PannesRoute);
app.use('/User', UserRoute);

//connect to db
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
  
app.listen(5000, () => console.log('Express server is running at port : '+ 5000)); 
