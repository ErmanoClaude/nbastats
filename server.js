// server.js
// Server.js is loaded first
// init project
const fs = require("fs");

const express = require("express");

const session = require("express-session");

// Store cookies
const store = new session.MemoryStore();

// Initialize a new Express application instance
const app = express();

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

const searchPlayer = require("./api");

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// get from index.html
app.get("/player", (req, res) => {
  const name = req.query.name;
  console.log(name);
  console.log("We are here finally");
  const playersId = {};

  fs.readFile("./public/players.txt", "utf8", async function (err, data) {
    if (err) throw err;
    data.split("\n").forEach((line) => {
      const regex = /^(\d+)\s+(.*)$/;
      const match = regex.exec(line);
      if (match) {
        const id = match[1];
        const playerName = match[2];
        playersId[playerName] = id;
      }
    });
    const results = await searchPlayer(playersId[name]);
    res.send(results);
  });
});


app.get("/lebron", (req,res)=>{
  res.sendFile(__dirname + "/views/lebron.html")
});

//login page
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    console.log(username, password);
  }
});

//Connecting to mongodb

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://ermano:" +
  process.env.mongoPass +
  "@cluster0.khcqdbg.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // listen for requests :)
    const listener = app.listen(process.env.PORT, function () {
      console.log("Your app is listening on port " + listener.address().port);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
