const express=require('express');
const path=require('path');
//init app
const app=express();

//Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//home route
app.get('/',function(req,res){
	let emp=[{
		empId:1001,
		empName:'Rahul vikash',
		empDep:'JAVA',
		empSalary:2001.44
	},
	{
		empId:1002,
		empName:'Uma',
		empDep:'JAVA',
		empSalary:3001.44
	},
	{
		empId:1003,
		empName:'Sachin',
		empDep:'OraApps',
		empSalary:2001.44
	}
	];
	res.render('index',{
		title:'This is Capgemini L&D',
		empData:emp
	});
});

//home route
app.get('/home',function(req,res){
	res.render('home',{
		mydata:'This is Capgemini L&D'
	});
});
//start server
app.listen(3000,function(){
	
	console.log('SERVER is running port no 3000');
});