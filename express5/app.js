const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
//Connecting Mongodb server
mongoose.connect('mongodb://localhost/nodekb');

let db=mongoose.connection;
//when connection open
db.once('open',function(){
	console.log('Connection Open');
});
//check for db error
db.on('error',function(err){
	console.log(err);
});
//init app
const app=express();


//Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Express Session MiddleWare
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
  }));
  //Express Message MiddleWare
  app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// Express Validator Middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root    = namespace.shift()
		, formParam = root;
  
	  while(namespace.length) {
		formParam += '[' + namespace.shift() + ']';
	  }
	  return {
		param : formParam,
		msg   : msg,
		value : value
	  };
	}
  }));
// parse application/x-www-form-urlencoded--For inserting
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json--For Inserting 
app.use(bodyParser.json())
//Bring from Module
let Employee=require('./model/employee');
//home route
app.get('/',function(req,res){
	Employee.find({},function(err,empployeedata){
		res.render('index',{
		
			title:'This is Capgemini L&D',
			empData:empployeedata,
			emg:'L&D Department'
		});
		
	});
});
	//var collection = db.get('employeedata');
   // var cursor = db.collection('employeedata');
	/*cursor.each(function(err,doc) {
		console.log(doc);
		data+=doc;
	}); */
	
//Router Files
let routeemp=require('./route/emproute');
app.use('/emp',routeemp);

//start server
app.listen(3000,function(){
	
	console.log('SERVER is running port no 3000');
});