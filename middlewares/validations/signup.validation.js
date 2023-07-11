const Joi = require('joi');

const emailPattern =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // userId는 알파벳 대소문자 (a~z, A~Z), 숫자(0~9)로 구성
const nicknamePattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/; // 닉네임은 한글, 알파벳 대소문자 (a~z, A~Z), 숫자(0~9)로 구성
const postUserSchema = Joi.object().keys({
  email: Joi.string().min(3).max(30).pattern(new RegExp(emailPattern)).required(),
  password: Joi.string().min(4).max(20).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  nickname: Joi.string().min(2).pattern(new RegExp(nicknamePattern)).required(),
  name: Joi.string().min(2).required(),
  age: Joi.number().min(1).required(),
  gender: Joi.required(),
});

module.exports = async (req, res, next) => {
  try {
    await postUserSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  next();
};
