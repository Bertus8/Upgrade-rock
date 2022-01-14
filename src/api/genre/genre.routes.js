const GenreRoutes = require('express').Router()
const { isAuth } = require('../../utils/middleware/auth')
const { postNewGenre, getGenre, deleteGenre, patchGenre, getAllGenre } = require('./genre.controller')

GenreRoutes.post('/',[isAuth], postNewGenre)
GenreRoutes.get('/:id', getGenre)
GenreRoutes.get('/', getAllGenre)
GenreRoutes.delete('/:id',[isAuth], deleteGenre)
GenreRoutes.patch('/:id',[isAuth], patchGenre)
module.exports = GenreRoutes