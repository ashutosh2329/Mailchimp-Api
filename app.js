const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(8000, function(){
	console.log("server is running at 8000 port address");
});
app.get("/",function(req, res){
	res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req, res){
	const firstName = req.body.first;
	const lastName = req.body.second;
	const email = req.body.email;

	const data = {
		members: [
		{
			email_address: email,
			status: "subscribed",
			merge_fields: {
				FNAME: firstName,
				LNAME: lastName
			}
		}
	]
	
	};

	const jsonData = JSON.stringify(data);

	const url = "https://usX.api.mailchimp.com/3.0/lists/1682f095ff" 
	const options = {
		method: "POST",
		auth: "ashutosh:use API key from mailchimp"
	}

  
    
    const request = https.request(url,options, function(response){

    	if (response.statusCode === 200) {

    		res.sendFile(__dirname + "/success.html");
    	}
    	else {
    		res.sendFile(__dirname + "/faliur.html");
    	}

   		response.on("data", function(data){
   			
   		})

    });
    
    request.write(jsonData);
    request.end();
});

app.post("/faliur", function(req, res){
	res.redirect("/")
})




