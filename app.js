const express = require("express");
const request = require("request");
const bosyParser = require("body-parser");

const app = express();


app.listen(8000, function(){
	console.log("server is running at 8000 port address");
});
