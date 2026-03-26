// backend/routes/news.js

const express = require('express');
const validateOrigin = require('../middleware/validateOrigin');
const router = express.Router();

const NEWS_API_URL = process.env.NEWS_API_URL;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/top-headlines',
    validateOrigin,
    async (req, res) => {
        try {
            const params = req.query;
            const response = await fetch(`${NEWS_API_URL}?${new URLSearchParams({ ...params, apiKey: NEWS_API_KEY })}`);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch news' });
        }
    });

module.exports = router;