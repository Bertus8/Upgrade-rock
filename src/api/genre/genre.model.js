const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword } = require('../../utils/validators/validation')
const { setError } = require('../../utils/errors/error')

const genreSchema = new mongoose.Schema({
    name: { type: 'String', trim: true, required: true },
    description: { type: 'String', trim: true},
    location: { type: 'String', trim: true},
    decade: { type: 'Number', trim: true}
}, { timestamps: true })

const Genre = mongoose.model('genre', genreSchema)
module.exports = Genre