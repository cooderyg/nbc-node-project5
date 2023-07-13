const UsersService = require('../services/users.service');

class UsersController {
  usersService = new UsersService();

  signUp = async (req, res) => {
    try {
      const {
        email,
        password, //
        nickname,
        name,
        age,
        gender,
        profileImage,
      } = req.body;

      const data = await this.usersService.signUp({
        email,
        password,
        nickname,
        name,
        age,
        gender,
        profileImage,
      });

      res.status(200).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      res.status(status).json({ message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { data, token } = await this.usersService.login({
        email,
        password,
      });
      res.cookie('authorization', `Bearer ${token}`);
      res.status(200).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      res.status(status).json({ message });
    }
  };

  findUserById = async (req, res) => {
    try {
      const { userId } = res.locals.user;

      const data = await this.usersService.findUserById({ userId });
      res.status(200).json({ data });
    } catch (error) {
      const { status, message } = error;
      if (!status) res.status(500).json({ message: '에러가 발생했습니다.' });
      res.status(status).json({ message });
    }
  };
}

module.exports = UsersController;
