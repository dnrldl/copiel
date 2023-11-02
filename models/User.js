//유저 스키마
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, '이메일을 입력해주세요'],
    unique: true,
    lowercase: true,
    validate: [isEmail, '유효한 이메일을 입력해주세요'],
  },
  password: {
    type: String,
    required: [true, '비밀번호를 입력해주세요'],
    minLength: [6, '최소 6자리 이상 입력해주세요'],
  },
  username: {
    type: String,
    required: [true, '이름을 입력해주세요'],
  },
  phone: {
    type: String,
    required: [true, '전화번호를 입력해주세요'],
    minLength: [11, '유효한 전화번호를 입력해주세요'],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

//데이터베이스에 저장되기 전 실행될 함수
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;
