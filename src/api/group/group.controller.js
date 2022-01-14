const Group = require('./group.model');
const { deleteFile } = require('../../utils/middleware/deleteFile')
const { setError } = require('../../utils/errors/error');

const postNewGroup = async (req, res, next) => {
    try {
        const newGroup = new Group(req.body)
        if (req.file) {
            newGroup.img = req.file.path
        }
        const groupDB  = await newGroup.save()
        return res.status(201).json(groupDB)
    } catch (error) {
        return next(setError(500, 'Group not save'))        
    }
}

const getAllGroups = async (req,res,next) => {
try {
    const groupDB = await Group.find().populate('albums').populate('genre').populate('members').populate('oldMembers')
    res.status(200).json(groupDB)
} catch (error) {
    console.log(error)
    return next(setError(500, 'Groups server errors'))
}
}

const getGroup = async (req,res,next) => {
    try {
        const { id } = req.params;
        const groupDB = await Group.findById(id).populate('albums').populate('genre').populate('members').populate('oldMembers')
        if (!groupDB){
            return next(setError(404, 'Group not found'))
        }
        return res.status(200).json(groupDB)
    } catch (error) {
        return next(setError(500, 'Group fail'))
    }
}

const deleteGroup = async (req,res,next) => {
    try {
        const { id } = req.params;
        const groupDB = await Group.findByIdAndDelete(id)
        if (!groupDB){
            return next(setError(404, 'Group not found'))
        }
        if (groupDB.img) {
            deleteFile(groupDB.img)
        }
        return res.status(200).json(groupDB)
    } catch (error) {
        return next(setError(500, 'Group fail'))
    }
}

const patchGroup = async (req,res,next) => {
    try {
        const { id } = req.params;
        const patchGroup = new Group(req.body);
        patchGroup._id = id
        if (req.file) {
            patchGroup.img = req.file.path
        }
        const groupDB = await Group.findByIdAndUpdate(id, patchGroup);
        if (!groupDB){
            return next(setError(404, 'Group not found'))
        }
        if (groupDB.img) {
            deleteFile(groupDB.img)
        }
        return res.status(200).json({new: patchGroup, old: groupDB})
    } catch (error) {
        return next(setError(500, 'Group fail'))
        
    }
}

const addAlbumToGroup = async (req,res,next) => {
    try {
        const groupDB = await Group.findByIdAndUpdate(req.params.id, {
            $addToSet: {
                albums: req.body.albums
            } 
        })
        if(!groupDB){
            return next(setError(404, 'Group not found'))
        }
        return res.status(200).json(groupDB)        
    } catch (error) {
        return next(setError(500, 'Group fail'))
    }
}

const addMemberToGroup = async (req,res,next) => {
    try {
        const groupDB = await Group.findByIdAndUpdate(req.params.id, {
            $addToSet: {
                members: req.body.members
            } 
        })
        if(!groupDB){
            return next(setError(404, 'Group not found'))
        }
        return res.status(200).json(groupDB)        
    } catch (error) {
        return next(setError(500, 'Group fail'))
    }
}


const addOldMemberToGroup = async (req,res,next) => {
    try {
        const groupDB = await Group.findByIdAndUpdate(req.params.id, {
            $addToSet: {
                oldMembers: req.body.oldMembers
            } 
        })
        if(!groupDB){
            return next(setError(404, 'Group not found'))
        }
        return res.status(200).json(groupDB)        
    } catch (error) {
        return next(setError(500, 'Group fail'))
    }
}

module.exports = {
    postNewGroup,
    getGroup,
    deleteGroup,
    patchGroup,
    getAllGroups,
    addAlbumToGroup,
    addMemberToGroup,
    addOldMemberToGroup
}