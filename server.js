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

/*
const express = require("express")
const path = require("path")
const app = express()
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "."))

const mongo = require("mongodb").MongoClient

const url = "mongodb://localhost:27017"let db, jobsCollection, jobs

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db("jobs")
    jobsCollection = db.collection("jobs")
    jobsCollection.find({}).toArray((err, data) => {
      jobs = data
    })
  }
)

app.get("/", (req, res) => {
  res.render("index", {
    jobs,
  })
})

app.listen(3000, () => console.log("Server ready"))

// index.pug file
html
  body
    each job in jobs
      p
      | #{job.company}
      br
      a(href=`${job.link}`) #{job.position}
*/