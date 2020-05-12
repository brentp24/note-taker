var notesData = require("../db/db.json");
var fs = require("fs");

module.exports = function (app) {



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
    fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(notesData), 'utf8',
        function errorfunction(err, data) {
            if (err) {
                console.log(err);
            }
        })
    // console.log(__dirname);
    res.json(newNote);
});

}