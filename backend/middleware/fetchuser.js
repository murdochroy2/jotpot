const jwt = require('jsonwebtoken')
const JWT_SECRET = "the jwt secret"
const GUEST_ID = process.env.GUEST_ID

const fetchUser = (req, res, next) => {
    try {
        const token = req.header('auth-token')
        if (!token)
            return res.status(401).send({ error: "Please authenticate using a valid token" })
        if (token === "guest") {
            req.user = {
                id: GUEST_ID
            }
        } 
        else {
            payload = jwt.verify(token, JWT_SECRET)
            req.user = payload.user
        }
        next()
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchUser