var DB = require("nosql");

var quiz = DB.load('./DB/quiz.nosql');

function Quiz(id, id_Course,title) {
	this.id = id;
	this.title = title;
	this.id_Course = id_Course;
	this.start = false;
	this.end = false; // True if Quiz is finished
	this.questions = []; // [{Question:Q1,propositions[P1,P2,P3,P4],Right: P2},{Question:Q2,propositions[P1,P2,P3,P4],Right: P4} ,,,, ]
}	


Quiz.prototype.save = function() {
var q = new Object();
q.id = this.id;
q.title = this.title;
q.id_Course = this.id_Course;
q.start = this.start;
q.end = this.end;
q.questions = this.questions;

quiz.insert(q);
}



Quiz.prototype.print = function() {
	console.log(this.id+" :  " + this.id_Course );
}

Quiz.prototype.addQuestion = function(question) {
	this.questions.push(question);
}


module.exports = Quiz;
