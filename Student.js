var DB = require("nosql");

var student = DB.load('./DB/student.nosql');

function Student(id,last_name,first_name,courses){
	this.id = id;
	this.last_name = last_name;
	this.last_name = first_name;
	this.courses = courses;
	console.log(" ----> CONSTRUCTOR OK ");
}


Student.prototype.save = function() {
	var s = new Object();
	s.id = this.id;
	s.last_name = this.last_name;
	s.first_name = this.first_name;
	s.courses = this.courses;
	student.insert(s);
	console.log(" ----> SAVE OK ");
}


Student.prototype.addCourse = function(course) {
	this.courses.push(course);
}

Student.getStudent = function(id,callback){
	student.find().make(function(filter) {
    filter.where('id', '=', id);
	filter.callback(function(err,response) {
		var r = response[0];
		if(r == undefined) {callback(undefined);return ;}
		 var t = new Student(r.id,r.last_name,r.first_name,r.courses);
		 callback(t) ;
		});
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