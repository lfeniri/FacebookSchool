var mongoose = require('mongoose');
var model = mongoose.model('student',{_id:String,last_name:String,first_name:String,courses:[Number]});

function Student(id,last_name,first_name,courses){
	this.id = id;
	this.last_name = last_name;
	this.first_name = first_name;
	this.courses = courses;
	console.log(" ----> CONSTRUCTOR OK ");
}


Student.prototype.save = function() {

	
	var m = model;
	var std = new m({_id:this.id,last_name:this.last_name,first_name:this.first_name,courses:[]});
	std.save(function (err) {
  if (err) {console.log(err);}else{console.log(" ----> SAVE OK ");}
	});
}

Student.prototype.addCourse = function(course) {
	this.courses.push(course);
	
}

Student.getStudent = function(id,callback){
	model.findById(id, function (err, std) {
		if (err || std == null) {callback(undefined);return ;};
		console.log("VOICIIIIIIIIIIIIIIIIIIIIIIIIIIII");
		console.log(std);
		var s = new Student(std._id,std.last_name,std.first_name,std.courses);
		callback(s);
		
	});  
}	


Student.getAllStudents = function(callback){
	 model.find({}, 'id', function(err, students){
        if(err){
          console.log(err);
        } else{
			callback(students);
        }
    }); 
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