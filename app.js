var express = require('express');
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var Student = require("./Student");
var Teacher = require("./Teacher");


var tokenHTC = "EAABuaW7sR7QBAA3JbeMvU52cRkgl1a3vSAbu6k1bL2ZAMyTDLcv8HOK7tidv3QC5sAuHKSBZC1JEZCGWwVizzUZBMZCBzOAgEZCPLyzeP5DySYZBlKpGK4YiSR3pTIxk32lRt7rcUeDe5cIPv4EpNmUNcbi821Oa2uez8EB2ZB70mAZDZD";

/*var messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title":"Classic White T-Shirt",
            "image_url":"http://petersapparel.parseapp.com/img/item100-thumb.png",
            "subtitle":"Soft white cotton t-shirt is back in style",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/view_item?item_id=100",
                "title":"View Item"
              },
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/buy_item?item_id=100",
                "title":"Buy Item"
              },
              {
                "type":"postback",
                "title":"Bookmark Item",
                "payload":"USER_DEFINED_PAYLOAD_FOR_ITEM100"
              }              
            ]
          },
          {
            "title":"Classic Grey T-Shirt",
            "image_url":"http://petersapparel.parseapp.com/img/item101-thumb.png",
            "subtitle":"Soft gray cotton t-shirt is back in style",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/view_item?item_id=101",
                "title":"View Item"
              },
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/buy_item?item_id=101",
                "title":"Buy Item"
              },
              {
                "type":"postback",
                "title":"Bookmark Item",
                "payload":"USER_DEFINED_PAYLOAD_FOR_ITEM101"
              }              
            ]
          }
        ]
      }
    }
};

*/
function facebookUserInfo(id,token,callback) {
   
  request({
    url: "https://graph.facebook.com/"+id,
    qs: {access_token:token},
    method: 'GET',
  }, function(error, response, body) {
		var data = JSON.parse(body);
		console.log("FIND NAME = "+ data.first_name);
		callback(data.last_name,data.first_name);
  });
}

function sendMessage(sender,token, messageData) {
   
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}



app.use(bodyparser.json());
app.get('/webhook', function (req, res) {
	
	console.log(Student.model);
  if (req.query['hub.verify_token'] === 'test_verifier') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});
var messageData={};
app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  
  var userExist = false;
  console.log("LEN === "+messaging_events.length);
  for (i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i];
    var senderID = event.sender.id;

	if (event.message &&  event.message.text) {
	   var text = event.message.text;
	   console.log(event.message);
	   
	   if(event.message.quick_reply){
		   console.log("LOG");
		   if(event.message.quick_reply.payload == "CREATE_USER"){
					messageData = {
					"text":"Are you :",
					"quick_replies":[
					  {
						"content_type":"text",
						"title":"TEACHER",
						"payload":"CREATE_USER_TEACHER"
					  },
					  {
						"content_type":"text",
						"title":"STUDENT",
						"payload":"CREATE_USER_STUDENT"
					  }
					]
				  };
				  sendMessage(senderID,tokenHTC,messageData);
		   }
		   if(event.message.quick_reply.payload == "CREATE_USER_TEACHER"){
			   console.log("TEACHER CREATION");
				facebookUserInfo(senderID,tokenHTC,function(last_name,first_name){
					var t = new Teacher(senderID,last_name,first_name,[]);
					t.save();
				});
		   }
		   if(event.message.quick_reply.payload == "CREATE_USER_STUDENT"){
			   console.log("STUDENT CREATION");
				facebookUserInfo(senderID,tokenHTC,function(last_name,first_name){
					var s = new Student(senderID,last_name,first_name,[]);
					console.log(s);
					s.save();
				});
		   }
			if(event.message.quick_reply.payload == "NO_CREATE_USER"){
				messageData = {"text":"THANK YOU :) "};
				sendMessage(senderID,tokenHTC,messageData);
		   }
		  userExist = true;
	   }
	   console.log("-----------------> DEBUT");
		Student.getStudent(senderID,function(res){
			if(res == undefined) return;
			userExist = true;
			console.log(res);
			
		});
		console.log("-----------------> FIN");
		/*
		Teacher.getTeacher(senderID,function(res){
			if(res == undefined) return;
			userExist = true;
			console.log(res);
		});*/
		if(!userExist){
		messageData = {
		"text":"Would you like to subscribe:",
		"quick_replies":[
		  {
			"content_type":"text",
			"title":"YES",
			"payload":"CREATE_USER"
		  },
		  {
			"content_type":"text",
			"title":"NO",
			"payload":"NO_CREATE_USER"
		  }
		]
		};
		//sendMessage(senderID,tokenHTC,messageData);
	}
	}
  }
  res.sendStatus(200);
});







app.listen(process.env.PORT || 3000 ) ;