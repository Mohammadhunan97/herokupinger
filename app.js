const express = require("express");
const app = express();
const fs = require("file-system");
const bodyParser = require('body-parser');
const http = require("http");
const port = process.env.PORT || 3000;
let pingfile = JSON.parse(fs.readFileSync("public/url.json"));
setInterval(()=>{
	pingfile.urls.forEach((url)=>{
		try{
			http.get(url.replace("s:", ":"));
		}catch(err){
			console.log("err",err);
		}
	})
},180000);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
	let html = fs.readFileSync("views/index.html");
	res.write(html);
	res.end();
})

app.get("/stylesheet",(req,res)=>{
	let css = fs.readFileSync("public/style.css");
	res.write(css);
	res.end();
})

app.get("/clientjs",(req,res)=>{
	let js = fs.readFileSync("public/script.js");
	res.write(js);
	res.end();
})

app.get("/logo",(req,res)=>{
	res.write(fs.readFileSync("public/logo.png"));
	res.end();
})
app.get("/manifest",(req,res)=>{
	res.write(fs.readFileSync("public/manifest.json"));
	res.end();
})

app.get("/submitted",(req,res)=> res.send("you're url has been submitted <a href='/'>Submit Another</a>"));

app.get("/false-url",(req,res)=> res.send("please enter a valid url <a href='/'>Try another</a>"))

app.post("/app/new",(req,res)=>{
	let urlmatch = "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})";
	if(req.body.url.match(urlmatch) && req.body.url.includes("herokuapp")){
		console.log("true")
		let file = JSON.parse(fs.readFileSync("public/url.json"));
		let urls = file.urls;
		urls.push(req.body.url);	
		fs.writeFile("public/url.json",JSON.stringify({urls}),(err)=>console.log(err));
		res.redirect("/submitted");
	}else{
		console.log("false");
		res.redirect("/false-url");
	}
	res.end();
})

app.listen(port);