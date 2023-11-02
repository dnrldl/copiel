const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
const usernameError = document.querySelector('.username.error');
const spaceError = document.querySelector('.space.error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  //reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
  usernameError.textContent = '';
  spaceError.textContent = '';

  //get values
  const email = form.email.value;
  const password = form.password.value;
  const username = form.username.value;

  try {
    const res = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
      usernameError.textContent = data.errors.username;
      spaceError.textContent = data.errors.spaceerror;
    }
    if (data.user) {
      location.assign('/');
    }
  } catch (err) {
    console.log(err);
  }
});
