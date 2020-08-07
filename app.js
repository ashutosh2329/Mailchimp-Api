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

	const url = "https://us17.api.mailchimp.com/3.0/lists/1682f095ff" 
	const options = {
		method: "POST",
		auth: "ashutosh:58bac2f27fe0c076f10f902db499c84a-us17"
	}

  
    
    const request = https.request(url,options, function(response){

    	if (response.statusCode === 200) {

    		res.send("Success");
    	}
    	else {
    		res.send("There was error with signup please try again");
    	}

   		response.on("data", function(data){
   			console.log(JSON.parse(data));
   		})

    });
    
    request.write(jsonData);
    request.end();
});




// api key
// 58bac2f27fe0c076f10f902db499c84a-us17
//list id
// 1682f095ff