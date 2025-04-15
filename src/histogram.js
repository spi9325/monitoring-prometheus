// this code is client code like node app we not create prometheus machine code here

import express from "express"
import client from "prom-client";

const http_Request_microseconds = new client.Histogram({
    name:`active_request`,
    help:`Number of active request`,
    labelNames:["method","route","code"],
    buckets:[0.1,5,15,50,100,300,500,1000,3000]
})

function middleware(req,res,next){
   const startTime = Date.now();

    //  if req finish means its complete successfully then under code run
   res.on(`finish`,()=>{
    const endTime = Date.now();
    console.log(`req took ${endTime - startTime}`)

    http_Request_microseconds.observe({
        method:req.method,
        route:req.route ? req.route.path : req.path,
        code:res.statusCode
    },endTime - startTime);
   });

   next();
}

const app = express();
app.use(middleware);

app.get("/cpu",async(req,res)=>{
   await new Promise(res=>
        setTimeout(res,Math.random()*1000)
    )
    res.json({
        message:"cpu"
    })
})

app.get("/users",(req,res)=>{
    res.json({
        message:"users"
    })
    const endTime = Date.now()
})

app.get("/metrics",async(req,res)=>{
    const metrics = await client.register.metrics();
    // user send json as res that is content type
    console.log( client.register.contentType)
    res.set(`Content-Type`, client.register.contentType);
    res.end(metrics);
})

app.listen(3000);







