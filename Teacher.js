var mongoose = require('mongoose');
model = mongoose.model('teacher',{_id:String,last_name:String,first_name:String,courses:[Number]});
mongoose.connect('mongodb://school:Lounes1993@ds029456.mlab.com:29456/school');

function Teacher(id,last_name,first_name,courses){
	this.id = id;
	this.last_name = last_name;
	this.first_name = first_name;
	this.courses = courses;
}


Teacher.prototype.save = function() {
var m = model;
	var std = new m({_id:this.id,last_name:this.last_name,first_name:this.first_name,courses:[]});
	std.save(function (err) {
  if (err) {console.log(err);}else{console.log(" ----> SAVE OK ");}
	});
}


Teacher.getTeacher = function(id,callback){
	model.findById(id, function (err, std) {
		if (err) callback(undefined);
		console.log("VOICIIIIIIIIIIIIIIIIIIIIIIIIIIII");
		var s = new Teacher(std._id,std.last_name,std.first_name,std.courses);
		callback(s);
		
	}); 
}	


Teacher.prototype.addCourse = function(course) {
	this.courses.push(course);
}


Teacher.prototype.print = function() {
	console.log("id = " + this.id);
	console.log("name = " + this.name);
	console.log("My courses: ");
	this.courses.forEach(function(course){
		console.log(course);
	});
}



module.exports = Teacher;