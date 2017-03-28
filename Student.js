var DB = require("nosql");

var student = DB.load('./DB/student.nosql');

function Student(id,name,courses){
	this.id = id;
	this.name = name;
	this.courses = courses;
}


Student.prototype.save = function() {
	var s = new Object();
	s.id = this.id;
	s.name = this.name;
	s.courses = this.courses;
	student.insert(s);
}


Student.prototype.addCourse = function(course) {
	this.courses.push(course);
}

Student.getStudent = function(id,callback){
	student.find().make(function(filter) {
    filter.where('id', '=', id);
	filter.callback(function(err,response) {
		var r = response[0];
		if(r == undefined) return undefined;
		 var t = new Student(r.id,r.name,r.courses);
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