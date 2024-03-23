const express = require('express')
const { body, validationResult } = require('express-validator');

const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "the jwt secret"

router.post('/createuser',
    [
        body('name').notEmpty(),
        body('password').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        try {
            let user0 = await User.findOne({ email: req.body.email })
            if (user0) {
                return res.status(400).send({ error: "User already exists" })
            }
            console.log("Creating User")
            const salt = await bcrypt.genSalt(10)
            const securePassword = await bcrypt.hash(req.body.password, salt)
            const user = new User({ name: req.body.name, email: req.body.email, password: securePassword })
            user.save()
                .then(
                    () => {
                        console.log("User Created")
                        const userData = {
                            user: {
                                id: user.id
                            }
                        }
                        const authToken = jwt.sign(userData, JWT_SECRET)
                        res.send({ authToken })
                    }
                )
                .catch(
                    (err) => {
                        console.log({ error: err.message })
                        res.send({ error: err.message })
                    }
                )
        }
        catch (err) {
            console.log({ error: err.message })
            res.status(500).send("Some error occurred")
        }

    }
)

router.post(
    '/login',
    [
        body('email').isEmail(),
        body('password').exists()
    ],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ Errors: result.array() });
        }
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (!user)
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            console.log("User Found")
            const passwordCompareResult = await bcrypt.compare(password, user.password)
            console.log("Password Compare Result: " + passwordCompareResult)
            if (!passwordCompareResult)
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            const userData = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(userData, JWT_SECRET)
            res.send({ authToken })
        }
        catch (err) {
            console.log({ error: err.message })
            res.status(500).send("Internal Server Error")
        }

    }
)

router.post(
    '/getuser',
    fetchuser,
    async (req, res) => {
        try {
            const userId = req.user.id
            const user = await User.findById(userId).select("-password")
            res.send(user)
        } catch (err) {
            console.log({ error: err.message })
            res.status(500).send("Internal Server Error")            
        }
    }
)

module.exports = router