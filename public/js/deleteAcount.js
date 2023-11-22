const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
const spaceError = document.querySelector('.space.error');

form.addEventListener('submit', async e => {
  e.preventDefault();

  emailError.textContent = '';
  passwordError.textContent = '';
  spaceError.textContent = '';

  //get values
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch('/deleteAcount', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();

    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
      spaceError.textContent = data.errors.spaceerror;
    }
    if (data) {
      alert('회원탈퇴가 완료되었습니다!');
      location.assign('/');
    }
  } catch (err) {
    console.log(err);
  }
});
