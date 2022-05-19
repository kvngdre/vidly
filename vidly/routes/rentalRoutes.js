const router = require('express').Router();
const rentalViewController = require('../controllers/rentalController');
const validateRental = require('../validators/rentalValidator');

router.get('/', async (req, res) => {
    const rentals = await rentalViewController.getAll();

    if(rentals.length === 0) return res.status(404).send('No rentals.');

    res.status(200).send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await rentalViewController.get(req.params.id);

    if (!rental) res.status(404).send('Not found/ Invalid ID.');

    res.status(200).send(rental)
});

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);

    if (error) return res.status(202).send(error.details[0].message);

    const rental = await rentalViewController.create(req.body);

    res.send(rental);
})


module.exports = router;
