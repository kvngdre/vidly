const router = require('express').Router();
const validateUser = require('../validators/userValidator');
const userViewController = require('../controllers/userController');
const _ = require('lodash');
const verifyToken = require('../middleware/verifyToken');


router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);

    // Guard clause
    if (error) return res.status(400).send(error.details[0].message);

    const result = await userViewController.create(req.body);
    
    if (result.message) return res.status(400).send(result.message);

    res.header('x-auth-token', result.token).status(201).send(_.pick(result.user, ['_id', 'name', 'email']));

});

router.get('/', async (req, res) => {
    const users = await userViewController.getAll();
    
    if (users.length === 0) return res.status(404).send('No users have been created.');

    res.status(200).send(users);
});

router.get('/me', verifyToken, async (req, res) => {
    const user = await userViewController.get(req.user._id);

    if(!user) return res.status(404).send('Invalid ID!');

    res.status(200).send(user);
});

router.put('/:id', async (req, res) => {
    const user = await userViewController.update(req.params.id, req.body);

    if(!user) return res.status(201).send('Invalid ID.');

    res.status(200).send(user);
});

router.delete('/:id', async (req, res) => {
    const user = userViewController.delete(req.params.id);

    if(!user) return res.status(201).send('Invalid ID.');

    res.status(200).send(user);
});

module.exports = router;
