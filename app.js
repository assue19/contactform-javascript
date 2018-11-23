const express = require ('express');
const app = express();
const bodyParser =require('body-parser')
const port = 80

app.use(bodyParser.json())


app.set('views',__dirname + '/views');
app.set('view engine','pug')

const mailer = require('express-mailer');
const auth={
	user:'a55abe0992c85c',
	pass:'14d4aba354cb2b'
}
const options={
	from:"assumpterkimeu16@gmail.com",
	host:"smtp.mailtrap.io",
	// secureConnection:true,
	port:25,
	auth:auth,
	transportMethod:'SMTP'
}
mailer.extend(app,options);


app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, x-Requested-Width,Content-Type,Accept"

);
	next();
});

app.post('/contacts', (req, res) => {
	
	const recipient= {
		to:" 8ac8901b36-94e6cc@inbox.mailtrap.io",
		subject:req.body.subject,
		name:req.body.name,
		message:req.body.message
	}

	app.mailer.send("email",recipient, (error)=>{
		console.log(error)
	});
	res.send('node.js application!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))