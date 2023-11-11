const form = document.querySelector('form');
const currentPasswordError = document.querySelector('.currentpassword.error');
const passwordError = document.querySelector('.password.error');
const passwordconfirmError = document.querySelector('.passwordconfirm.error');
const spaceError = document.querySelector('.space.error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  currentPasswordError.textContent = '';
  passwordconfirmError.textContent = '';
  passwordconfirmError.textContent = '';

  //get values
  const currentpassword = form.currentpassword.value;
  const password = form.password.value;
  const passwordconfirm = form.passwordconfirm.value;

  try {
    const res = await fetch('/changepassword', {
      method: 'POST',
      body: JSON.stringify({
        currentpassword: currentpassword,
        password: password,
        passwordconfirm: passwordconfirm,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);

    if (data.errors) {
      currentPasswordError.textContent = data.errors.currentpassword;
      passwordError.textContent = data.errors.password;
      passwordconfirmError.textContent = data.errors.passwordconfirm;
      spaceError.textContent = data.errors.spaceerror;
    }
    if (data.user) {
      location.assign('/logout');
    }
  } catch (err) {
    console.log(err);
  }
});
