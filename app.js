let express = require("express");
let app = express();
let request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search");
});

app.get("/results", function(req, res){
	let query = req.query.search;
	let url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			let data = JSON.parse(body);
			res.render("results", {data:data});
		}
	});
});

app.listen(8000, function(){
	console.log("Servidor funcionando na porta 8000");
});