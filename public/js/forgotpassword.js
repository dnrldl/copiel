const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
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
  emailError.textContent = '';
  nameError.textContent = '';
  phoneError.textContent = '';
  spaceError.textContent = '';
  findError.textContent = '';

  //get values
  const email = form.email.value;
  const name = form.name.value;
  const phone = form.phone.value;

  try {
    const res = await fetch('/forgotpassword', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        name: name,
        phone: phone,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();

    if (data.errors) {
      emailError.textContent = data.errors.email;
      nameError.textContent = data.errors.name;
      phoneError.textContent = data.errors.phone;
      spaceError.textContent = data.errors.spaceerror;
      findError.textContent = data.errors.finderror;
    } else {
      alert(
        '지정된 이메일로 발송된 임시 비밀번호로 로그인 후 바로 비밀번호 변경을 해주세요!'
      );
      location.assign('/login'); //비밀번호 바꾸게 해주기
    }
  } catch (err) {
    console.log(err);
  }
});
