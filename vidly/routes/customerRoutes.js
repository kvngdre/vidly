const router = require('express').Router();
const Customer = require('../models/customerModel');
const customerValidator = require('../validators/customerValidator');
const customerViewController = require('../controllers/customerController');


router.get('/', async (req, res) => {
    const customers = await customerViewController.getAll(req.query.name);
    console.log(customers)

    if(customers.length === 0) return res.render('customers/index', { customers: customers, queryParams: req.query, errorMessage: 'No customers.' })

    return res.render('customers/index', { customers: customers , queryParams: req.query });
});

router.get('/new', async (req, res) => {
    // const customer = await customerViewController.get(req.params.id);

    // if(!customer) return res.status(404).send('Invalid ID');

    // res.status(200).send(customer);

    res.render('customers/new', { customer: {}, newCustomer: undefined })
});

router.post('/', async (req, res) => {
    const { error } = customerValidator(req.body);
    console.log(req.body)
    if(error) return res.render('customers/new', { customer: req.body, errorMessage: error.details[0].message, newCustomer: undefined });

    const customer = await customerViewController.create(req.body);
    if(customer instanceof Error) return res.render('customers/new', { customer: req.body, errorMessage: customer.message, newCustomer: undefined });

    res.render('customers/new', {newCustomer: customer, customer: req.body});
});

router.put('/:id', async (req, res) => {
    const customer = await customerViewController.update(req.params.id, req.body);

    if(customer.message) return res.status(500).send(customer.message);

    res.status(200).send(customer);
});

module.exports = router;
