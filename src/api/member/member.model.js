const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({
    name: { type: 'String', trim:true, required: true },
    surname: { type: 'String', trim:true },
    birthDate: { type: 'String', trim:true },
    role: [{ type: 'String', trim:true }],
},
    {
        timestamps: true
    }
);

const Member = mongoose.model("members", MembersSchema);
module.exports = Member;