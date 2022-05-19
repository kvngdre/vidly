// Importing dependencies
const express = require('express');
const router = express.Router();
const genreViewController = require('../controllers/genreController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const logger = require('../middleware/logger');


router.post('/', verifyToken, async (req, res) => {  
    // second arg is a middleware func. Third is the req, res handler.
    const result = await genreViewController.create(req.body);

    if(result.message) return res.status(400).send(result.message);

    res.status(201).send(result);
});

router.get('/', async (req, res, ) => {
    const genres = await genreViewController.getAll();
    
    if(genres.length === 0) {
        const message = 'No genres found.'
        logger.log({
            level: 'error',
            message: 'testing'
        })
        // res.status(404).send(message);
        throw new Error(message);
    };

    res.status(200).send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await genreViewController.get(req.params.id);

    if(!genre) {
        const message = 'Genre not found'
        res.status(404).send(message);
        throw new Error(message);
        // return 
    };

    res.status(200).send(genre);
});

router.put('/:id', async (req, res) => {
    const genre = await genreViewController.put(req.params.id, req.body);

    if(!genre) return res.status(404).send('Invalid ID.');

    res.status(201).send(genre);
});

router.delete('/:id', [verifyToken, verifyAdmin], async (req, res) => {
    const genre = await genreViewController.delete(req.params.id);

    // Guard clause
    if(!genre) return res.status(404).send('Invalid ID');

    res.status(200).send(genre);
});

module.exports = router;
