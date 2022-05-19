const router = require('express').Router();
const customerViewController = require('../controllers/customerController');
const validateCustomer = require('../validators/customerValidator');


router.get('/', async (req, res) => {
    const customers = await customerViewController.getAll();

    if(customers.length === 0) return res.status(404).send('There are no customers.');

    res.status(200).send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await customerViewController.get(req.params.id);

    if(!customer) return res.status(404).send('Invalid ID');

    res.status(200).send(customer);
});

router.post('/', async (req, res) => {
    const customer = await customerViewController.create(req.body);

    if(customer.message) return res.status(500).send(customer.message);

    res.status(200).send(customer);
});

router.put('/:id', async (req, res) => {
    const customer = await customerViewController.update(req.params.id, req.body);

    if(customer.message) return res.status(500).send(customer.message);

    res.status(200).send(customer);
});

module.exports = router;
