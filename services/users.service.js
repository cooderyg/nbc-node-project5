const UsersRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');
const HttpException = require('../utils/error');
require('dotenv').config();

class UsersService {
  usersRepository = new UsersRepository();

  signUp = async ({
    email,
    password, //
    nickname,
    name,
    age,
    gender,
    profileImage,
  }) => {
    const isExitstUser = await this.usersRepository.findUser({ email });
    //이미 db에 이메일이 있다면

    if (isExitstUser) throw new HttpException(409, '이미 존재하는 이메일입니다.');

    const user = await this.usersRepository.createUser({
      email,
      password,
      nickname,
    });

    const userInfo = await this.usersRepository.createUserInfo({
      userId: user.userId,
      name,
      age,
      gender,
      profileImage,
    });
    return userInfo;
  };

  login = async ({ email, password }) => {
    // 유저 찾기
    const user = await this.usersRepository.findUser({ email });
    if (!user) throw new HttpException(401, '해당하는 사용자가 존재하지 않습니다.');
    if (user.password !== password) throw new HttpException(401, '비밀번호가 일치하지 않습니다.');

    // JWT 발급
    const token = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.SECRET_KEY, // env넣기
    );

    return { data: '로그인에 성공하였습니다.', token };
  };

  findUserById = async ({ userId }) => {
    // 사용자 테이블과 사용자 정보 테이블에 있는 데이터를 가지고 옴
    const user = await this.usersRepository.findUserById({ userId });
    return user;
  };
}

module.exports = UsersService;
