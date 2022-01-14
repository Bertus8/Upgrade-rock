const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword } = require('../../utils/validators/validation')
const { setError } = require('../../utils/errors/error')
const Schema = mongoose.Schema

const groupSchema = new Schema({
    name: { type: 'String', trim: true, required: true },    
    year: { type: 'Number', trim: true},
    genre:  [{ type: Schema.Types.ObjectId, trim: true, ref: "genre"}],
    albums:  [{ type: Schema.Types.ObjectId, trim: true, ref: "albums"}],
    members:  [{ type: Schema.Types.ObjectId, trim: true, ref: "members"}],
    oldMembers:  [{ type: Schema.Types.ObjectId, trim: true, ref: "members"}],
}, { timestamps: true })

const Group = mongoose.model('group', groupSchema)
module.exports = Group