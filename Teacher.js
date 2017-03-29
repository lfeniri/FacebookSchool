var DB = require("nosql");

var teacher = DB.load('./DB/teacher.nosql');

function Teacher(id,last_name,first_name,courses){
	this.id = id;
	this.last_name = last_name;
	this.first_name = first_name;
	this.courses = courses;
}


Teacher.prototype.save = function() {
var t = new Object();
t.id = this.id;
t.last_name = this.last_name;
t.first_name = this.first_name;
t.courses = this.courses;
teacher.insert(t);
}


Teacher.getTeacher = function(id,callback){
	teacher.find().make(function(filter) {
    filter.where('id', '=', id);
	filter.callback(function(err,response) {
		var r = response[0];
		if(r == undefined) {callback(undefined);return ;}
		 var t = new Teacher(r.id,r.last_name,r.first_name,r.courses);
		 callback(t) ;
		});
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