const { Users, UserInfos } = require('../models');
class UsersRepository {
  findUser = async ({ email }) => {
    return await Users.findOne({ where: { email } });
  };

  findUserById = async ({ userId }) => {
    return await Users.findOne({
      where: { userId },
      attributes: ['userId', 'email', 'createdAt', 'updatedAt'],
      include: [
        {
          model: UserInfos,
          attributes: ['name', 'age', 'gender', 'profileImage'],
        },
      ],
    });
  };

  createUser = async ({ email, password, nickname }) => {
    return await Users.create({ email, password, nickname });
  };

  createUserInfo = async ({ userId, name, age, gender, profileImage }) => {
    return await UserInfos.create({
      UserId: userId,
      name,
      age,
      gender,
      profileImage,
    });
  };
}

module.exports = UsersRepository;
