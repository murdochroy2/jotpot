const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/jotpot?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5"
const connectToMongo = () => {
    mongoose.connect(mongoURI, ).then(() => {
        console.log("Connected to Mongo Successfully")
    })
}
module.exports = connectToMongo