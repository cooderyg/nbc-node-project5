const express = require('express');
const { Users, UserInfos } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware');
const UsersController = require('../controllers/users.controller');
const signupVaildation = require('../middlewares/validations/signup.validation');
const router = express.Router();

const usersController = new UsersController();
// 회원가입
router.post('/signup', signupVaildation, usersController.signUp);
// 회원가입 끝

// 로그인
router.post('/login', usersController.login);
// 로그인 끝

// 내 정보 조회
router.get('/users', authMiddleware, usersController.findUserById);
// 내 정보 조회 끝

module.exports = router;
