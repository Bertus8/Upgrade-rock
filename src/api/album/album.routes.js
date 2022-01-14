const AlbumRoutes = require('express').Router()
const { isAuth } = require('../../utils/middleware/auth')
const { postNewAlbum, getAlbum, deleteAlbum, patchAlbum, getAllAlbums } = require('./album.controller')
const upload = require('../../utils/middleware/file')

AlbumRoutes.post('/',[isAuth], upload.single('img'), postNewAlbum)
AlbumRoutes.get('/:id', getAlbum)
AlbumRoutes.get('/', getAllAlbums)
AlbumRoutes.delete('/:id',[isAuth], deleteAlbum)
AlbumRoutes.patch('/:id',[isAuth], upload.single('img'), patchAlbum)

module.exports = AlbumRoutes;