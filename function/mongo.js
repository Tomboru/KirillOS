const mongoose = require('mongoose')
const { mongodbl } = require('../config/mongodb.json')

module.exports = async () => {
    await mongoose.connect(mongodbl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}