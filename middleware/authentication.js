const jwt = require('jsonwebtoken')
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).send('Authentication invalid 1')
        }
        // const token = authHeader.split(" ")[1]
        try {
            const payload = jwt.verify(authHeader, process.env.JWT_SECRET)
            req.user = {userId:payload.userId, name:payload.name}
        } catch (error) {
            res.status(401).send('Authentication invalid 2')
        }
        next()
    } catch (error) {
        res.status(401).send('Authentication invalid 3')
    }
}

module.exports = auth;