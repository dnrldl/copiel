const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const usernameError = document.querySelector('.username.error');
const phoneError = document.querySelector('.phone.error');
const spaceError = document.querySelector('.space.error');
const findError = document.querySelector('.find.error');

const oninputPhone = target => {
  target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

form.addEventListener('submit', async e => {
  e.preventDefault();

  //reset errors
  emailError.textContent = '';
  usernameError.textContent = '';
  phoneError.textContent = '';
  spaceError.textContent = '';
  findError.textContent = '';

  //get values
  const email = form.email.value;
  const username = form.username.value;
  const phone = form.phone.value;

  try {
    const res = await fetch('/forgotpassword', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        username: username,
        phone: phone,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);

    if (data.errors) {
      emailError.textContent = data.errors.email;
      usernameError.textContent = data.errors.username;
      phoneError.textContent = data.errors.phone;
      spaceError.textContent = data.errors.spaceerror;
      findError.textContent = data.errors.finderror;
    }
    if (data.user) {
      console.log(data.user);
      location.assign('/'); //비밀번호 바꾸게 해주기
    }
  } catch (err) {
    console.log(err);
  }
});
