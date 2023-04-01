
  
  process.setMaxListeners(0);
  
  const http = require("http");
  const express = require("express");
  const bodyParser = require("body-parser");
  const port = 9000;

  const cors=require('cors')
  
  const socketIO = require("socket.io");
  
  
  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server,{cors:{origin:"*"}});
  const demoFun=require('./demoPup')
  

  
  app.use(cors());

  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  
  io.
  use(async (socket,next)=>{
    const apiKey=socket?.handshake?.auth?.apikey
    const isAuthorised=true
    if(isAuthorised){
      next()
    }
    else{
      socket.disconnect(true)
    }
  })
  .on("connection", async (socket) => {
   
    
    socket.on("StartConnection", async (device) => {
      console.log("starting connection")

    });

    socket.on("demo",()=>{
       demoFun();
    })
  

  
    socket.on("sendBulk",(payload)=>{
      console.log(payload)
    })
  });
  
  
  
  
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/core/home.html");
  });
  
  app.get("/device", (req, res) => {
    res.sendFile(__dirname + "/core//device.html");
  });
  
  app.get("/scan/:id", (req, res) => {
    res.sendFile(__dirname + "/core//index.html");
  });
  app.get("/get",(req,res)=>{
    res.redirect('https://offerplant.com/')
  })
  
  app.post("/device", (req, res) => {
    const no = req.body.device;
    res.redirect("/scan/" + no);
  });

  
  server.listen(port, function () {
    console.log("App running on : " + port);
  });
  