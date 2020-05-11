var express = require("express");
var fs = require("fs");

var app = express();
var path = require("path");

var PORT = process.env.PORT || 3000;

var notesData = require("./db/db.json");

app.use(express.urlencoded({ extended: true })); //activity 12/13 es6 extension
app.use(express.json());

//ROUTING //
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


// Displays all notes
app.get("/api/notes", function (req, res) {
    return res.json(notesData);
});


// Create New Notes- takes in JSON input

app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;

    notesData.push(newNote);

//re write the file. 
    fs.writeFile("./db/db.json", JSON.stringify(notesData), 'utf8', 
    function readFileCallback(err, data){
            if (err){
                console.log(err);
            }
        })
    // notesData.push(newNote);
    res.json(newNote);

    
});





// ===============================================================================
// ROUTING
// ===============================================================================


// app.get("/api/tables", function(req, res) {
//   res.json(tableData);
// });

// // API POST Requests
// // ---------------------------------------------------------------------------

// app.post("/api/tables", function(req, res) {
//   // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
//   // It will do this by sending out the value "true" have a table
//   // req.body is available since we're using the body parsing middleware
//     tableData.push(req.body);
//     res.json(true);
// });





// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
