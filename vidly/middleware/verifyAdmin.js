

function verifyAdmin(req, res, next) {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) return res.status(403).send('Access Denied. Admin right required.')

    next();
}

module.exports = verifyAdmin;