const bodyParser= require('body-parser');
const express=require('express');
const app=express();
const hts=require("https");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html");
});

app.get("/jokes.html",(req,res)=>{
  res.sendFile(__dirname+"/jokes.html");
});
app.get("/quotes.html",(req,res)=>{
  res.sendFile(__dirname+"/quotes.html");
});      
app.get("/quotes.html",(req,res)=>{
                res.sendFile(__dirname+"/quotes2.html");
                });
app.post("/quotes.html",(req,res)=>{
                const url="https://api.kanye.rest/";
                hts.get(url,(response)=>{
                if (response.statusCode===200){
                    console.log(response.statusCode);
                    response.on("data",(data)=>{
                        
                        quote=JSON.parse(data);
                        res.write("<h1 style='color: #333; font-size: 32px; font-weight: bold; text-align: center;'>"+quote.quote+"</h1>");
                        res.write("<a href='/'><button style='background-color: #ffcc00; color: white; font-size: 16px; cursor: pointer;'>Back to home</button></a>");
                        res.end();
                    });
                }
                
                });
  });
app.get("/about.html",(req,res)=>{
    res.sendFile(__dirname+"/aboutus.html");
});
  app.get("/jokes.html",(req,res)=>{
    res.sendFile(__dirname+"/jokes2.html");
    });
app.post("/jokes.html",(req,res)=>{
const url="https://v2.jokeapi.dev/joke/Any?type=single";
hts.get(url, (response) => {
if (response.statusCode === 200) {
  console.log(response.statusCode);
  let jokeData = '';

  response.on('data', (chunk) => {
    jokeData += chunk;
  });

  response.on('end', () => {
    try {
      const joke = JSON.parse(jokeData);

      res.write("<h1 style='color: #333; font-size: 32px; font-weight: bold; text-align: center;'>" + joke.joke +"</h1>");
      res.write("<a href='/'><button style='background-color: #ffcc00; color: white; font-size: 16px; cursor: pointer;'>Back to home</button></a>");
      res.end();
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Error parsing JSON');
    }
  });
}   
 }
  )
 
});

app.listen("3000",()=>{
    console.log("working in port 3000");
});

