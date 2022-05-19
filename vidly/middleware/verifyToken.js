const jwt = require('jsonwebtoken');


function verifyToken(req, res, next){
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).send("Access Denied. No token provided.");

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = verifiedUser;
        next();

    }catch(error) {
        res.status(400).send('Invalid token provided.')
    }
}

module.exports = verifyToken;