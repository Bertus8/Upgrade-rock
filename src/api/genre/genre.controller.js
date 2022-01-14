const Genre = require('./genre.model');
const { setError } = require('../../utils/errors/error');

const postNewGenre = async (req, res, next) => {
    try {
        const newGenre = new Genre(req.body)
        const genreDB  = await newGenre.save()
        return res.status(201).json(genreDB)
    } catch (error) {
        return next(setError(500, 'Genre not save'))        
    }
}
const getAllGenre = async (req,res,next) => {
    try {
        const genreDB = await Genre.find()
        res.status(200).json(genreDB)
    } catch (error) {
        console.log(error)
        return next(setError(500, 'Genres server errors'))
    }
    }

const getGenre = async (req,res,next) => {
    try {
        const { id } = req.params;
        const genreDB = await Genre.findById(id)
        if (!genreDB){
            return next(setError(404, 'Genre not found'))
        }
        return res.status(200).json(genreDB)
    } catch (error) {
        return next(setError(500, 'Genre fail'))
    }
}

const deleteGenre = async (req,res,next) => {
    try {
        const { id } = req.params;
        const genreDB = await Genre.findByIdAndDelete(id)
        if (!genreDB){
            return next(setError(404, 'Genre not found'))
        }
        return res.status(200).json(genreDB)
    } catch (error) {
        return next(setError(500, 'Genre fail'))
    }
}

const patchGenre = async (req,res,next) => {
    try {
        const { id } = req.params;
        const patchGenre = new Genre(req.body);
        patchGenre._id = id
        const genreDB = await Genre.findByIdAndUpdate(id, patchGenre);
        if (!genreDB){
            return next(setError(404, 'Genre not found'))
        }
        return res.status(200).json({new: patchGenre, old: genreDB})
    } catch (error) {
        return next(setError(500, 'Genre fail'))
        
    }
}

module.exports = {
    postNewGenre,
    getGenre,
    getAllGenre,
    deleteGenre,
    patchGenre
}