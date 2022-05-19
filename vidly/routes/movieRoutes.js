// Importing dependencies
const router = require('express').Router();
const movieViewCOntroller = require('../controllers/movieController');
const verifyToken = require('../middleware/verifyToken');
const validateMovie = require('../validators/movieValidator');


router.get('/', async (req, res) => {
    const movies = await movieViewCOntroller.getAll();

    if(movies.length === 0) res.status(404).send('No movies');

    res.status(200).send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await movieViewCOntroller.get(req.params.id);

    if(!movie) return res.status(400).send('Invalid ID');

    res.status(200).send(movie);
});

router.post('/', verifyToken, async (req, res) => {
    // const response = validateMovie(req.body);
    const { error } = validateMovie(req.body);

    // Guard Clause
    // if (response.error) return res.send(response.error.message);
    if (error) return res.send(error.details[0].message);

    const movie = await movieViewCOntroller.create(req.body);

    // Guard clause 2
    if(movie.message) return res.status(400).send(movie.message);

    res.status(201).send(movie);
});

router.put('/:id', async (req, res) => {
    const movie = await movieViewCOntroller.update(req.params.id, req.body);

    if(!movie) return res.status(400).send('Invalid ID!');

    res.status(201).send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await movieViewCOntroller.delete(req.params.id);

    res.status(200).send(movie);
});

module.exports = router;
