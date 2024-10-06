// backend/routes/news.js

const express = require('express');
const validateOrigin = require('../middleware/validateOrigin');
const router = express.Router();

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

router.get('/top-headlines',
    validateOrigin,
    async (req, res) => {
        try {
            const params = req.query;
            const response = await fetch(`${NEWS_API_URL}?${new URLSearchParams({ ...params })}`);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch news' });
        }
    });

module.exports = router;