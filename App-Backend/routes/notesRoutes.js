import express from "express";
import Note from "../models/Note.js"; // Ensure to add .js extension
import authMiddleware from "../middleware/authMiddleware.js"; // Ensure to add .js extension


const router = express.Router();

router.post("/notes", authMiddleware, async (req, res) => { // Updated endpoint to /notes

  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content, userId: req.user, createdAt: new Date() }); // Added createdAt field

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/notes", authMiddleware, async (req, res) => { // Updated endpoint to /notes

  try {
    const notes = await Note.find({ userId: req.user });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/notes/:id", authMiddleware, async (req, res) => { // Updated endpoint to /notes/:id

  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/notes/:id", authMiddleware, async (req, res) => { // Updated endpoint to /notes/:id

  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; // Change to export default
