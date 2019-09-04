const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const token = req.header('Bearer');

    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next();
    }catch (e) {
        req.status(400).send('Invalid token.')
    }
}