const router = require('express').Router();
const Customer = require('../models/customerModel');
const customerValidator = require('../validators/customerValidator');
const customerViewController = require('../controllers/customerController');


router.get('/', async (req, res) => {
    console.log('-----',req.query.name)
    const customers = await customerViewController.getAll(req.query.name);

    if(customers.length === 0) return res.render('customers.index', {errorMessage})(404).send('No customers.');

    return res.render('customers/index', { customers: customers , queryParams: req.query });
});

router.get('/new', async (req, res) => {
    // const customer = await customerViewController.get(req.params.id);

    // if(!customer) return res.status(404).send('Invalid ID');

    // res.status(200).send(customer);

    res.render('customers/new', { customer: {} })
});

router.post('/', async (req, res) => {
    const { error } = customerValidator(req.body);
    if(error) return res.render('customers/new', { customer: req.body, errorMessage: error.details[0].message });

    const customer = await customerViewController.create(req.body);
    if(customer instanceof Error) return res.render('customers/new', { customer: req.body, errorMessage: customer.message });

    res.render('customers/new', {customer});
});

router.put('/:id', async (req, res) => {
    const customer = await customerViewController.update(req.params.id, req.body);

    if(customer.message) return res.status(500).send(customer.message);

    res.status(200).send(customer);
});

module.exports = router;
