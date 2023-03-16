const express = require("express");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);

    // get route
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });

    //   post route
    app.post("/api/notes", (req, res) => {
      const curNotes = req.body;
      const noteId = { ...curNotes, id: notes.length + 1 };
      notes.push(noteId);
      dbUpdate();

      //show the note when I click save
      res.json(req.body);
      return console.log(`New note added${curNotes.title}`);
    });

    // Note with id
    app.get("/api/notes/:id", (req, res) => {
      res.json(notes.get[req.params.id]);
    });

    // Deletes note
    app.delete("/api/notes/:id", (req, res) => {
      const id = req.params.id;
      const noteIndex = notes.findIndex((x) => x.id) === parseInt(id);
      notes.splice(noteIndex, 1);
      dbUpdate();

      //Delete the note I click delete
      res.json(req.body.id);
      console.log("Delete note " + req.params.id);
    });

    //Display notes
    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    //Update the file when a note is added
    function dbUpdate() {
      fs.watchFile("./db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
