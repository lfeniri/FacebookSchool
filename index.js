var Teacher = require("./Teacher");
var Student = require("./Student");

var Course = require("./Course");
var Quiz = require("./Quiz");

var DB = require("nosql");
var quiz = DB.load('./DB/quiz.nosql');

var s = new Student(123,"test","test",[]);
s.save();