// this code is client code like node app we not create prometheus machine code here

import express from "express"
import client from "prom-client";

const active_req_gauge = new client.Gauge({
    name:`active_request`,
    help:`Number of active request`
})

function middleware(req,res,next){
    active_req_gauge.inc();
   const startTime = Date.now();

    //  if req finish means its complete successfully then under code run
   res.on(`finish`,()=>{
    const endTime = Date.now();
    console.log(`req took ${endTime - startTime}`)

    // increment activerequest gauge
    active_req_gauge.dec();
   });

   next();
}

const app = express();
app.use(middleware);

app.get("/cpu",async(req,res)=>{
   await new Promise(res=>
        setTimeout(res,7000)
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







