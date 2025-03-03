const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

// Create Note
router.post("/", async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const newNote = new Note({ title, content, userId });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Notes for a User
router.get("/:userId", async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.params.userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Note
router.put("/:id", async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Note
router.delete("/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
