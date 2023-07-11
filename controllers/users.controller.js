const UsersService = require('../services/users.service');

class UsersController {
  usersService = new UsersService();

  signUp = async (req, res) => {
    const {
      email,
      password, //
      confirmPassword,
      nickname,
      name,
      age,
      gender,
      profileImage,
    } = req.body;

    const { code, data } = await this.usersService.signUp({
      email,
      password,
      confirmPassword,
      nickname,
      name,
      age,
      gender,
      profileImage,
    });

    res.status(code).json({ data });
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const { code, data, token } = await this.usersService.login({
      email,
      password,
    });
    token ? res.cookie('authorization', `Bearer ${token}`) : null;
    res.status(code).json({ data });
  };

  findUserById = async (req, res) => {
    const { userId } = res.locals.user;

    const { code, data } = await this.usersService.findUserById({ userId });
    res.status(code).json({ data });
  };
}

module.exports = UsersController;
