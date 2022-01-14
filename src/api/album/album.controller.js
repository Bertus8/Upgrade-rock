const Album = require('./album.model');
const { deleteFile } = require('../../utils/middleware/deleteFile')
const { setError } = require('../../utils/errors/error');

const postNewAlbum = async (req, res, next) => {
    try {
        const newAlbum = new Album(req.body)
        if (req.file) {
            newAlbum.img = req.file.path
        }
        const albumDB  = await newAlbum.save()
        return res.status(201).json(albumDB)
    } catch (error) {
        return next(setError(500, 'Album not save'))        
    }
}

const getAllAlbums = async (req,res,next) => {
try {
    const albumDB = await Album.find().populate('genre')
    res.status(200).json(albumDB)
} catch (error) {
    console.log(error)
    return next(setError(500, 'Albums server errors'))
}
}

const getAlbum = async (req,res,next) => {
    try {
        const { id } = req.params;
        const albumDB = await Album.findById(id)
        if (!albumDB){
            return next(setError(404, 'Album not found'))
        }
        return res.status(200).json(albumDB)
    } catch (error) {
        return next(setError(500, 'Album fail'))
    }
}

const deleteAlbum = async (req,res,next) => {
    try {
        const { id } = req.params;
        const albumDB = await Album.findByIdAndDelete(id)
        if (!albumDB){
            return next(setError(404, 'Album not found'))
        }
        if (albumDB.img) {
            deleteFile(albumDB.img)
        }
        return res.status(200).json(albumDB)
    } catch (error) {
        return next(setError(500, 'Album fail'))
    }
}

const patchAlbum = async (req,res,next) => {
    try {
        const { id } = req.params;
        const patchAlbum = new Album(req.body);
        patchAlbum._id = id
        if (req.file) {
            patchAlbum.img = req.file.path
        }
        const albumDB = await Album.findByIdAndUpdate(id, patchAlbum);
        if (!albumDB){
            return next(setError(404, 'Album not found'))
        }
        if (albumDB.img) {
            deleteFile(albumDB.img)
        }
        return res.status(200).json({new: patchAlbum, old: albumDB})
    } catch (error) {
        return next(setError(500, 'Album fail'))
        
    }
}

module.exports = {
    postNewAlbum,
    getAlbum,
    deleteAlbum,
    patchAlbum,
    getAllAlbums
}