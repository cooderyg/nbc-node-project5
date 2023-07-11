const UsersRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UsersService {
  usersRepository = new UsersRepository();

  signUp = async ({
    email,
    password,
    confirmPassword,
    nickname,
    name,
    age,
    gender,
    profileImage,
  }) => {
    try {
      const isExitstUser = await this.usersRepository.findUser({ email });
      //이미 db에 이메일이 있다면
      if (isExitstUser) {
        return { code: 409, data: '이미 존재하는 이메일입니다.' };
      }
    } catch (error) {
      return { code: 500, data: error.message };
    }

    // 유저 & 유저정보 생성
    try {
      const user = await this.usersRepository.createUser({
        email,
        password,
        nickname,
      });
      // 사용자 정보 테이블에 데이터를 삽입
      const userInfo = await this.usersRepository.createUserInfo({
        userId: user.userId,
        name,
        age,
        gender,
        profileImage,
      });
      return { code: 201, data: userInfo };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  login = async ({ email, password }) => {
    try {
      // 유저 찾기
      const user = await this.usersRepository.findUser({ email });
      if (!user) {
        return { code: 401, data: '해당하는 사용자가 존재하지 않습니다.' };
      } else if (user.password !== password) {
        return { code: 401, data: '비밀번호가 일치하지 않습니다.' };
      }
      // JWT 발급
      const token = jwt.sign(
        {
          userId: user.userId,
        },
        process.env.SECRET_KEY, // env넣기
      );

      return { code: 200, data: '로그인에 성공하였습니다.', token };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  findUserById = async ({ userId }) => {
    // 사용자 테이블과 사용자 정보 테이블에 있는 데이터를 가지고 옴
    try {
      const user = await this.usersRepository.findUserById({ userId });
      return { code: 200, data: user };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };
}

module.exports = UsersService;
