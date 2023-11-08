//Handle Errors
const handleErrors = err => {
  console.log(err.message, err.code);
  let errors = {
    email: '',
    password: '',
    passwordconfirm: '',
    username: '',
    phone: '',
    spaceerror: '',
    finderror: '',
  };

  //incorrect email
  if (err.message === 'incorrect email')
    errors.email = '가입되지 않은 이메일입니다';

  //incorrect password
  if (err.message === 'incorrect password')
    errors.password = '비밀번호가 틀립니다';

  //include space
  if (err.message === 'include space')
    errors.spaceerror = '입력란에 공백을 넣지 마세요';

  //username length error
  if (err.message === 'username length error')
    errors.username = '2자리 이상의 이름을 입력해주세요';

  //phone length error
  if (err.message === 'phone length error')
    errors.phone = '11자리의 전화번호를 입력해주세요';

  //password confirm error
  if (err.message === 'password confirm error')
    errors.passwordconfirm = '비밀번호가 일치하지 않습니다. 다시 시도해 보세요';

  //find email is null
  if (err.message === 'find acount is null')
    errors.finderror =
      '입력값이 잘못되었거나 일치하는 계정이 없습니다. 다시 시도해 보세요';

  //duplicate error code
  if (err.code === 11000) errors.email = '이미 사용중인 이메일입니다';

  //validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message; //path = email or password
    });
  }

  return errors;
};

module.exports = { handleErrors };
