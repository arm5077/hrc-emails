var request = require('request');
fs  = require("fs");
var https = require('https');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

fs.readFile("data.json", 'utf8', function(err, data){
	
	data = JSON.parse(data);
	
	data.Results.forEach(function(email, i){
		console.log("http://foia.state.gov/searchapp/"+email.pdfLink);
		
		
		setTimeout(function(){
			
			var request = https.get("https://foia.state.gov/searchapp/"+email.pdfLink, function(response, err) {
				if(err) throw err;
				var file = fs.createWriteStream("export/" + email.pdfLink.slice(-13));
				console.log(i + " " + email.pdfLink);
			  	response.pipe(file);
			});
			
		}, i*250);
	
	});

	
});
