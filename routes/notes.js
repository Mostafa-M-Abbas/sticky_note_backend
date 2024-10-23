const express = require("express");
const router = express.Router();
const Note = require("../models/note");

// Display all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: "desc" });
    res.render("allNotes", { notes });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Show add note form
router.get("/new", (req, res) => {
  res.render("addNote");
});

// Create new note
router.post("/new", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).send("Title and content are required");
    }
    const newNote = new Note({ title, content });
    await newNote.save();
    res.redirect("/notes");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.post("/delete/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/notes");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
