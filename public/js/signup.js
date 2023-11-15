const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
const passwordconfirmError = document.querySelector('.passwordconfirm.error');
const nameError = document.querySelector('.name.error');
const usernameError = document.querySelector('.username.error');
const phoneError = document.querySelector('.phone.error');
const spaceError = document.querySelector('.space.error');

const oninputPhone = target => {
  target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

form.addEventListener('submit', async e => {
  e.preventDefault();

  //reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
  passwordconfirmError.textContent = '';
  nameError.textContent = '';
  usernameError.textContent = '';
  phoneError.textContent = '';
  spaceError.textContent = '';

  //get values
  const email = form.email.value;
  const password = form.password.value;
  const passwordconfirm = form.passwordconfirm.value;
  const name = form.name.value;
  const username = form.username.value;
  const phone = form.phone.value;

  try {
    const res = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        passwordconfirm: passwordconfirm,
        name: name,
        username: username,
        phone: phone,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
      passwordconfirmError.textContent = data.errors.passwordconfirm;
      nameError.textContent = data.errors.name;
      usernameError.textContent = data.errors.username;
      phoneError.textContent = data.errors.phone;
      spaceError.textContent = data.errors.spaceerror;
    }
    if (data.user) {
      alert('회원가입 완료되었습니다!');
      location.assign('/login');
    }
  } catch (err) {
    console.log(err);
  }
});
