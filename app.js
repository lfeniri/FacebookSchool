var express = require('express');
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var Student = require("./Student");

var tokenHTC = "EAABuaW7sR7QBAA3JbeMvU52cRkgl1a3vSAbu6k1bL2ZAMyTDLcv8HOK7tidv3QC5sAuHKSBZC1JEZCGWwVizzUZBMZCBzOAgEZCPLyzeP5DySYZBlKpGK4YiSR3pTIxk32lRt7rcUeDe5cIPv4EpNmUNcbi821Oa2uez8EB2ZB70mAZDZD";

var messageData = {
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
  if (req.query['hub.verify_token'] === 'test_verifier') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});


app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  
  for (i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i];
    var senderID = event.sender.id;
	var text = event.message.text;
	
	if (event.message && text) {
      
	  if(text == "create"){
		request({
			url: "https://graph.facebook.com/"+senderID,
			qs: {access_token:token},
			method: 'GET',
			json: {
			  recipient: {id:sender},
			  message: messageData,
			}
		  }, function(error, response, body) {
			 console.log(body);
			if (error) {
			  console.log('Error sending message: ', error);
			} else if (response.body.error) {
			  console.log('Error: ', response.body.error);
			}
		  });
	  }
		  
	  
	  
		Student.getStudent("234",function(res){console.log(res);});
		sendMessage(senderID,tokenHTC,messageData);
	}
  }
  res.sendStatus(200);
});







app.listen(process.env.PORT || 3000 ) ;