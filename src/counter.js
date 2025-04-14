// this code is client code like node app we not create prometheus machine code here

import express from "express"
import client from "prom-client";

// this is first metric that see total number of HTTP request
// i track metric for request
const requestCounter = new client.Counter({
    name: `http_requests_total`,
    help: `total number of HTTP request`,
    labelNames: [`method` , `route` , `status_code`]
});

function middleware(req,res,next){
   const startTime = Date.now();

    //  if req finish means its complete successfully then under code run
   res.on(`finish`,()=>{
    const endTime = Date.now();
    console.log(`req took ${endTime - startTime}`)

    // increment request counter
    requestCounter.inc({
        method:req.method,
        route:req.route ? req.route.path : req.path,
        status_code:res.statusCode
    });
   });

   next();
}

const app = express();
app.use(middleware);

app.get("/cpu",(req,res)=>{
    for(let i = 0; i < 1000000; i++){
        Math.random();
    }
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