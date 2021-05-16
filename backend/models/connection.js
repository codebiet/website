require("dotenv").config();
const url = process.env.databaseUrl;
const dbName = process.env.dbName;

const mongoose = require('mongoose');
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log('connected');
});

module.exports = mongoose;