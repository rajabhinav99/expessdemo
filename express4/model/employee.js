let mongoose=require('mongoose');
//let Schema = mongoose.Schema;

let EmployeeSchema=mongoose.Schema({
empid:{
	type:Number,
	required:true
},
empname:{
type: String,
required: true
},
empdep:{
type:String,
required: true
},
empsalary:{
	type:Number,
	required: true
	}
},{ collection: 'employeedata' });

//console.log('In model'+employeeSchema);
let Employee= module.exports= mongoose.model('Employee',EmployeeSchema);
//module.exports = employeedata;