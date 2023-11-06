const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
const usernameError = document.querySelector('.username.error');
const phoneError = document.querySelector('.phone.error');
const spaceError = document.querySelector('.space.error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  //reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
  usernameError.textContent = '';
  phoneError.textContent = '';
  spaceError.textContent = '';

  //get values
  const email = form.email.value;
  const password = form.password.value;
  const username = form.username.value;
  const phone = form.phone.value;

  try {
    const res = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
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
      usernameError.textContent = data.errors.username;
      phoneError.textContent = data.errors.phone;
      spaceError.textContent = data.errors.spaceerror;
    }
    if (data.user) {
      location.assign('/');
    }
  } catch (err) {
    console.log(err);
  }
});
