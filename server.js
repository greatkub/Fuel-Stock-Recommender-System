const express = require('express');
const Tank = require('./Tank');
const path = require("path")
const app = express();
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "."))

app.get('/', async(req, res)=>{
    const response = await Tank();
    // let response; ( async ()=>{
    // response = 
   // })
    res.send(response);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listen on port ${PORT}...`);
})
