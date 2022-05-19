const validate = require('../validators/authValidation');
const router = require('express').Router();
const auth = require('../controllers/authController');



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    const result = await auth.post(req.body);

    if (result.message) return res.status(400).send(result.message);

    res.status(200).send(result);
})

module.exports = router;
