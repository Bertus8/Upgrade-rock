const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword } = require('../../utils/validators/validation')
const { setError } = require('../../utils/errors/error')
const Schema = mongoose.Schema

const albumSchema = new Schema({
    name: { type: 'String', trim: true, required: true },
    groupName: { type: 'String', required: true },
    genre:  [{ type: Schema.Types.ObjectId, trim: true, ref: "genre"}] ,
    year: { type: 'Number', trim: true},
    discographic: { type: 'String', trim: true},
    img: { type: 'String', trim: true },
}, { timestamps: true })

const Album = mongoose.model('albums', albumSchema)
module.exports = Album