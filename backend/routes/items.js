const express = require('express');
const ItemModel = require('../models/Item');
const { body, validationResult } = require('express-validator');

const router = express.Router();
fetchuser = require('../middleware/fetchuser')

// Create a new item
router.post(
    '/add',
    [
        body('name', "Enter a valid name").isLength({ min: 3 }),
        body('currentLocation', "Enter a valid location").isLength({ min: 3 }),
    ],
    // fetchuser,
    async (req, res) => {
        try {
            const result = validationResult(req);
            if (result.isEmpty() === false) {
                return res.status(400).json({ errors: result.array() });
            }
            const requestData = getRequestData();
            console.log(`Name: ${requestData.name}, Current Location: ${requestData.currentLocation}`)
            const item = new ItemModel(requestData);
            await item.save();
            res.json(item);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create item' });
        }

        function getRequestData() {
            return Object.keys(ItemModel.schema.paths).reduce(
                (acc, field) => {
                    if (req.body[field]) {
                        acc[field] = req.body[field];
                    }
                    return acc;
                },
                {}
            );
        }
    }
);

const defaultArea = "home";
// Get all items
router.get('/list', async (req, res) => {
    try {
        const area = defaultArea; // TODO: Get from query parameter or filter by ip address
        const items = await ItemModel.find();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve items' });
    }
});

// Get a single item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await ItemModel.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve item' });
    }
});

// Update an item
router.put('/:id', async (req, res) => {
    try {
        const item = await ItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Delete an item
router.delete('/:id', async (req, res) => {
    try {
        await ItemModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;