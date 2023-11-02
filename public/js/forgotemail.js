const form = document.querySelector('form');
const usernameError = document.querySelector('.username.error');
const phoneError = document.querySelector('.phone.error');
const spaceError = document.querySelector('.space.error');

form.addEventListener('submit', async e => {
  e.preventDefault();

  //reset errors
  usernameError.textContent = '';
  phoneError.textContent = '';

  //get values
  const username = form.username.value;
  const phone = form.phone.value;

  try {
    const res = await fetch('/forgotemail', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        phone: phone,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);

    if (data.errors) {
      usernameError.textContent = data.errors.username;
      phoneError.textContent = data.errors.phone;
    }
    if (data.user) {
      alert('찾으실 이메일은' + data.user.email + '입니다');
    }
  } catch (err) {
    console.log(err);
  }
});
