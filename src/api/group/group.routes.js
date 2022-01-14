const GroupRoutes = require('express').Router()
const { isAuth } = require('../../utils/middleware/auth')
const { postNewGroup, getGroup, deleteGroup, patchGroup, getAllGroups, addAlbumToGroup,addMemberToGroup,addOldMemberToGroup } = require('./group.controller')
const upload = require('../../utils/middleware/file')

GroupRoutes.post('/',[isAuth], postNewGroup)
GroupRoutes.get('/:id', getGroup)
GroupRoutes.get('/', getAllGroups)
GroupRoutes.delete('/:id',[isAuth], deleteGroup)
GroupRoutes.patch('/:id',[isAuth], patchGroup)
GroupRoutes.patch('/addAlbumToGroup/:id',[isAuth], addAlbumToGroup)
GroupRoutes.patch('/addMemberToGroup/:id',[isAuth], addMemberToGroup)
GroupRoutes.patch('/addOldMemberToGroup/:id',[isAuth], addOldMemberToGroup)

module.exports = GroupRoutes;