const MemberRoutes = require('express').Router()
const { isAuth } = require('../../utils/middleware/auth')
const { postNewMember, getMember, deleteMember, patchMember, getAllMember  } = require('./member.controller')

MemberRoutes.post('/',[isAuth], postNewMember)
MemberRoutes.get('/:id', getMember)
MemberRoutes.get('/', getAllMember)
MemberRoutes.delete('/:id',[isAuth], deleteMember)
MemberRoutes.patch('/:id',[isAuth], patchMember)
module.exports = MemberRoutes