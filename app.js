// Core Modules
const path = require("path");

// External Module
const express = require("express");
const bodyParser = require("body-parser");

// Local Module
const { hostRouter } = require("./routers/hostRouter");
const storeRouter = require("./routers/storeRouter");
const rootDir = require("./util/path-util");
const errorController = require('./controllers/errorController');
// const {mongoConnect} = require("./util/database-util");
const mongoose = require('mongoose');
//auth
const { authRouter } = require("./routers/authRouter");


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next)=>{
  req.isLoggedIn = req.get('cookie')?.split("=")[1] === 'true' ;
  console.log(res.get('cookie')?.split("=")[1] === 'true');
next();
})
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});
app.use("/host", hostRouter);

app.use(authRouter);

app.use(errorController.get404);

const PORT = 3001;



const MONGO_DB_URL = "mongodb+srv://shubhambhavsar0904:shubham20jun@airbnb.oji09.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});