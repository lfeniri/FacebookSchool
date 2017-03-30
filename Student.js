var mongoose = require('mongoose');

function Student(id,last_name,first_name,courses){
	this.id = id;
	this.last_name = last_name;
	this.first_name = first_name;
	this.courses = courses;
	console.log(" ----> CONSTRUCTOR OK ");
}


Student.model = function(){
	var student = mongoose.model('student',{id:String,last_name:String,first_name:String,courses:[Number]});
}

Student.prototype.save = function() {
	mongoose.connect('mongodb://school:Lounes@ds029456.mlab.com:29456/school');
	var m = mongoose.model('student',{id:String,last_name:String,first_name:String,courses:[Number]});
	var std = new m({id:this.id,last_name:this.last_name,first_name:this.first_name,courses:[]});
	std.save(function (err) {
  if (err) {console.log(err);}else{console.log(" ----> SAVE OK ");}
	});
	
}


Student.prototype.addCourse = function(course) {
	this.courses.push(course);
}

Student.getStudent = function(id,callback){

}	



Student.prototype.print = function() {
	console.log("id = " + this.id);
	console.log("name = " + this.name);
	console.log("My courses: ");
	this.courses.forEach(function(course){
		console.log(course);
	});
}

module.exports = Student;