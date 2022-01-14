const Member = require('./member.model');
const { setError } = require('../../utils/errors/error');

const postNewMember = async (req, res, next) => {
    try {
        const newMember = new Member(req.body)
        const memberDB  = await newMember.save()
        return res.status(201).json(memberDB)
    } catch (error) {
        return next(setError(500, 'Member not save'))        
    }
}

const getAllMember = async (req,res,next) => {
    try {
        const memberDB = await Member.find()
        res.status(200).json(memberDB)
    } catch (error) {
        console.log(error)
        return next(setError(500, 'Member server errors'))
    }
    }

const getMember = async (req,res,next) => {
    try {
        const { id } = req.params;
        const memberDB = await Member.findById(id)
        if (!memberDB){
            return next(setError(404, 'Member not found'))
        }
        return res.status(200).json(memberDB)
    } catch (error) {
        return next(setError(500, 'Member fail'))
    }
}

const deleteMember = async (req,res,next) => {
    try {
        const { id } = req.params;
        const memberDB = await Member.findByIdAndDelete(id)
        if (!memberDB){
            return next(setError(404, 'Member not found'))
        }
        return res.status(200).json(memberDB)
    } catch (error) {
        return next(setError(500, 'Member fail'))
    }
}

const patchMember = async (req,res,next) => {
    try {
        const { id } = req.params;
        const patchMember = new Member(req.body);
        patchMember._id = id
        const memberDB = await Member.findByIdAndUpdate(id, patchMember);
        if (!memberDB){
            return next(setError(404, 'Member not found'))
        }
        return res.status(200).json({new: patchMember, old: memberDB})
    } catch (error) {
        return next(setError(500, 'Member fail'))
        
    }
}

module.exports = {
    postNewMember,
    getMember,
    getAllMember,
    deleteMember,
    patchMember
}