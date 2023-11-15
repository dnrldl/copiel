const form = document.querySelector('form');
const nameError = document.querySelector('.name.error');
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
  nameError.textContent = '';
  phoneError.textContent = '';
  spaceError.textContent = '';
  findError.textContent = '';

  //get values
  const name = form.name.value;
  const phone = form.phone.value;

  try {
    const res = await fetch('/forgotemail', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        phone: phone,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);

    if (data.errors) {
      nameError.textContent = data.errors.name;
      phoneError.textContent = data.errors.phone;
      spaceError.textContent = data.errors.spaceerror;
      findError.textContent = data.errors.finderror;
    }
    if (data.user) {
      alert('찾으신 이메일은 ' + data.user.email + '입니다');
      location.assign('/login');
    }
  } catch (err) {
    console.log(err);
  }
});
