var Teacher = require("./Teacher");
var Student = require("./Student");

var Course = require("./Course");
var Quiz = require("./Quiz");

var DB = require("nosql");
var quiz = DB.load('./DB/quiz.nosql');
/*
quiz.find().make(function(filter) {
    filter.where('id', '=', 2);
	filter.callback(function(err,response) {
		 console.log(response[0]);
		});
	});
 */
 
//Teacher.getTeacher("2354",function(res){res.print();});
Student.getStudent("234",function(res){console.log(res);});
//t.print();
/*
var teacher1 = new Teacher("2354","Yacine");
teacher1.addCourse(1);
teacher1.addCourse(2);
teacher1.addCourse(3);
teacher1.print();
teacher1.save();*/