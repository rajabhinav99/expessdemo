const express=require('express');
//init app
const app=express();
//home route
app.get('/',function(req,res){
	res.send('Hello World');
});
//start server
app.listen(3000,function(){
	
	console.log('SERVER is running port no 3000');
});