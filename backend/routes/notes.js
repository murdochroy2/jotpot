const express = require('express')
const Notes = require('../models/Notes')
const router = express.Router()
fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

router.get('/fetchall',
    fetchuser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.user.id })
            console.log(`Notes found for user ${req.user.id}: ${notes}`)
            res.json(notes)
        }
        catch (err) {
            console.log({ error: err.message })
            res.status(500).send("Internal Server Error")
        }
    }
)

router.post(
    '/add',
    fetchuser,
    [
        body('name', "Enter a valid name").isLength({ min: 3 }),
        body('description', "Enter a valid description").isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            const { name, description, tag } = req.body
            console.log(`Name: ${name}, Description: ${description}, Tag: ${tag}, User: ${req.user.id}`)
            const note = await Notes.create(
                {
                    name: name,
                    description: description,
                    tag: tag,
                    user: req.user.id
                }
            )
            res.json(note)
        }
        catch (err) {
            console.log({ error: err.message })
            res.status(500).send("Internal Server Error")
        }
    }
)

router.put(
    "/update/:id",
    fetchuser,
    [
        body('name', "Enter a valid name").optional().isLength({ min: 3 }),
        body('description', "Enter a valid description").optional().isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            const note = await Notes.findById(req.params.id)
            if (!note)
                return res.status(404).send("Note not found")
            if (note.user.toString() !== req.user.id)
                return res.status(401).send("Unauthorized Access")
            const { name, description, tag } = req.body
            const updatedFields = {}
            if (name)
                updatedFields.name = name
            if (description)
                updatedFields.description = description
            if (tag)
                updatedFields.tag = tag
            const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true })
            res.json(updatedNote)
        }
        catch (err) {
            // console.log({ error: err.message })
            // res.status(500).send("Internal Server Error")
            res.status(500).json({ error: err.message })
        }
    }
)

router.delete(
    "/delete/:id",
    fetchuser,
    async (req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            if (!note)
                return res.status(404).send("Note not found")
            if (note.user.toString() !== req.user.id)
                return res.status(401).send("Unauthorized Access")
            const deletedNote = await Notes.findByIdAndDelete(req.params.id)
            res.json({ success: "Note Deleted", deletedNote: deletedNote})
        }
        catch (err) {
            console.log({ error: err.message })
            res.status(500).send("Internal Server Error")
        }
    }
)

module.exports = router