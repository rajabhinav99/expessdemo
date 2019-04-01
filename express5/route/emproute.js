const express = require('express');
const router = express.Router();

//Bring from Module
let Employee=require('../model/employee');
//home route
router.get('/home',function(req,res){
	res.render('home',{
		mydata:'This is Capgemini L&D'
	});
});



//add route
router.get('/add',function(req,res){
	res.render('addEmployee',{
		mydata:'This is Capgemini L&D'
	});
});
//submit data
router.post('/adddata',function(req,res){

req.checkBody('eid','Id should Be there').notEmpty();
req.checkBody('ename','Name should Be there').notEmpty();
req.checkBody('edep','Department should Be there').notEmpty();
req.checkBody('esal','Salary should Be there').notEmpty();
//Get Error
let errors=req.validationErrors();
//console.log(errors);
if(errors){
	res.render('addEmployee',{
		mydata:'This is Capgemini L&D',
		errors:errors
	});
}else{
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
	req.flash('success','Employee Added..');
	 res.redirect('/');
}
});
}
});
//Search & then send for Update 
router.get('/searchemp/:id',function(req,res){
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
router.post('/updatedata/:id',function(req,res){
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
			req.flash('success','Employee Updated..');
			 res.redirect('/');
		}
	});
	

	
});
//Delete Data from Mongo DB
router.get('/deleteemp/:id',function(req,res){
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

module.exports=router;