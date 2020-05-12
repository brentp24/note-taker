var notesData = require("../db/db.json");
var fs = require("fs");


module.exports = function (app) {

    // Displays all notes
    app.get("/api/notes", function (req, res) {
        return res.json(notesData);
    });


    // Create New Notes- takes in JSON input
    app.post("/api/notes/", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newNote = req.body;

        //add on ID number
        newNote.id = Date.now();

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

    // DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

    app.delete(`/api/notes/:id`, function (req, res) {
        //read the file. 
        var chosen = req.params.id; 
        
        fs.readFile(__dirname + "/../db/db.json", 'utf8',
            function errorfunction(err, data) {
                if (err) {
                    console.log(err);
                }

                // parse it so that it is an array
                var myJSON = JSON.parse(data) 
        
                    //find where id = chosen
                for(var i = 0; i < myJSON.length; i++) {
                    if(myJSON[i].id = chosen) {
                        myJSON.splice(i, 1);
                        // break;
                    }
                }

               console.log(myJSON)  

               fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(myJSON), 'utf8',
               function errorfunction(err, data) {
                   if (err) {
                       console.log(err);
                   }
               })
            })
        res.json(notesData);
    });

}


