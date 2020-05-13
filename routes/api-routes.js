var notesData = require("../db/db.json");
var fs = require("fs");

module.exports = function (app) {
    // Displays all notes
    app.get("/api/notes", function (req, res) {
        return res.json(notesData);
    });

    // Create New Notes- takes in JSON input
    app.post("/api/notes/", function (req, res) {
        var newNote = req.body;
        //add on ID number
        newNote.id = Date.now();
        //push newNote to data
        notesData.push(newNote);
        //re write the file. 
        fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(notesData), 'utf8',
            function errorfunction(err, data) {
                if (err) {
                    console.log(err);
                }
            })
        res.json(newNote);
    });

    // delete note
    app.delete(`/api/notes/:id`, function (req, res) {
        //read the file. 
        var chosen = req.params.id;
        fs.readFile(__dirname + "/../db/db.json", 'utf8',
            function errorfunction(err, data) {
                if (err) {
                    console.log(err);
                }
  // parse it so that it is an array
               var parsedData = JSON.parse(data)
               var clearedData = parsedData.filter(parsedData => parsedData.id != chosen);

               console.log(clearedData)

               fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(clearedData), 'utf8',
               function errorfunction(err, clearedData) {
                   if (err) {
                       console.log(err);
                   }
                   res.json(clearedData); 
               })
    });
})
}

