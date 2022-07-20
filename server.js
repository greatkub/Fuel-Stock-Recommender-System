const express = require('express');
const Tank = require('./Tank');


const app = express();

app.get('/', async(req, res)=>{
    const response = await Tank();
    res.send(response);

})

const PORT = process.env.PORT || 3000;

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listen on port ${PORT}...`);
})