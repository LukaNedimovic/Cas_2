var express = require("express");
var router = express.Router();
var mongo = require("mongodb");

router.get("/", function(req,res,next) {
	console.log("GET REQUEST");
});	

router.post("/", function(req,res,next) {	
	const MongoClient = require('mongodb').MongoClient;
	const uri = "URI_VASE_BAZE";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

	client.connect(err => {
		const collection = client.db("accounts").collection("accountsInformation");
		let personDocument = {
			"name": req.body.name,
			"lastName": req.body.lastName
		}

		const p = collection.insertOne(personDocument);
		
		collection.find({}).toArray(function(err, result) { //Ovaj blok koda jednostavno pošalje JSON file, sa svim dokumetima u kolekciji u bazi podataka. 
			if (err) throw err;
			console.log(result);
			res.status(200).json({'accountsInformation' : result}); //Da bismo pristupili podacima, jednostavno pristupimo .accountsInformation ključu.
		});	
	});	
	client.close();
});

module.exports = router;


