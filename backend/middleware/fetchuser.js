const jwt = require('jsonwebtoken')
const JWT_SECRET = "the jwt secret"

const fetchUser = (req, res, next) => {
    try {
        const token = req.header('auth-token')
        if (!token)
            res.status(401).send({ error: "Please authenticate using a valid token" })
        payload = jwt.verify(token, JWT_SECRET)
        req.user = payload.user
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    next()
}

module.exports = fetchUser