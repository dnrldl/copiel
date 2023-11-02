const form = document.querySelector('form');
const usernameError = document.querySelector('.username.error');
const spaceError = document.querySelector('.space.error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  usernameError.textContent = '';

  //get values
  const username = form.username.value;

  try {
    const res = await fetch('/changeusername', {
      method: 'POST',
      body: JSON.stringify({ username: username }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);

    if (data.errors) {
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
