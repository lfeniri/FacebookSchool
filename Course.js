var DB = require("nosql");
var course = DB.load('./DB/course.nosql');


function Course(id, name) {
	this.id = id;
	this.name = name;
	this.quizzes = [];
}	


Course.prototype.save = function() {
	
var c = new Object();
c.id = this.id;
c.name = this.name;
c.quizzes = this.quizzes;
course.insert(c);
}

Course.prototype.print = function() {
	console.log(this.id+" :  " + this.name );
}

Course.prototype.addQuiz = function(quiz) {
	this.quizzes.push(quiz);
}


module.exports = Course;


