import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js';

const router = express.Router()

router.post('/add', middleware, async (req, res) => {
    try {
        const { title, description } = req.body;

        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        });
        await newNote.save()

        return res
            .status(200)
            .json({ success: true, message: "Note Created Successfully" })
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({ success: false, message: "Error in Adding Note" })

    }
})

router.get('/', middleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id })
        return res.status(200).json({ success: true, notes })
    } catch (error) {
        console.log("sld" + req.user)
        return res.status(500).json({ success: false, message: "can't retrive notes" })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const UpdateNote = await Note.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json({ success: true, UpdateNote })
    } catch (error) {
        return res.status(500).json({ success: false, message: "can't update notes" })
    }

})


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const UpdateNote = await Note.findByIdAndDelete(id, req.body, { new: true })
        return res.status(200).json({ success: true, UpdateNote })
    } catch (error) {
        return res.status(500).json({ success: false, message: "can't delete notes" })
    }

})

export default router;
