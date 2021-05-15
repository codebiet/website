require("dotenv").config();
const path = require('path');
const url = process.env.databaseUrl;
const dbName = process.env.dbName;

const mongoose = require('mongoose');
mongoose.connect(path.join(url,dbName),{useNewUrlParser:true,useUnifiedTopology:true});

db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log('connected');
});

module.exports = mongoose;