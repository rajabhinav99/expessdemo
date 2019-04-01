const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
var bodyParser = require('body-parser');
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
	


//home route
app.get('/home',function(req,res){
	res.render('home',{
		mydata:'This is Capgemini L&D'
	});
});

//add route
app.get('/add',function(req,res){
	res.render('addEmployee',{
		mydata:'This is Capgemini L&D'
	});
});
//submit data
app.post('/emp/adddata',function(req,res){
	let emp=new Employee();
emp.empid=req.body.eid;
emp.empname=req.body.ename;
emp.empdep=req.body.edep;
emp.empsalary=req.body.esal;
emp.save(function(err){
if(err){
	console.log(err);
	return;
}else{
	 res.redirect('/');
}
});

});
//Search & then send for Update 
app.get('/searchemp/:id',function(req,res){
	Employee.findById(req.params.id,function(err,edata){
if(err){
	console.log(err);
}else{
	res.render('updateemployee',{
		data:edata
	});
}
	});
	
});
//Update the Mongo database
app.post('/emp/updatedata/:id',function(req,res){
	let emp={};
emp.empid=req.body.eid;
emp.empname=req.body.ename;
emp.empdep=req.body.edep;
emp.empsalary=req.body.esal;
	let query= {_id:req.params.id};
    //console.log(query);
	Employee.update(query,emp,function(err){
		if(err){
			console.log(err);
			return;
		}else{
			 res.redirect('/');
		}
	});
	});
//Delete Data from Mongo DB
app.get('/deleteemp/:id',function(req,res){
	let queryDelete={_id:req.params.id};
	Employee.remove(queryDelete,function(err){
		if(err){
			console.log(err);
			return;
		}else{
			 res.redirect('/');
		}
	});
	
});
//start server
app.listen(3000,function(){
	
	console.log('SERVER is running port no 3000');
});