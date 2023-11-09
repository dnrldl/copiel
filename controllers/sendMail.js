const nodemailer = require('nodemailer');

module.exports.sendMailToUser = (userEmail, userTempPassword) => {
  // 보내는 이메일 주소와 암호 설정
  const sender_email = 'chosh62222@gmail.com';
  const sender_password = process.env.GMAIL_APP_PASS;

  // 수신자 이메일 주소 설정
  const receiver_email = userEmail;

  // 이메일 설정
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: sender_email,
      pass: sender_password,
    },
  });

  // 이메일 보내기
  const mailOptions = {
    from: sender_email,
    to: receiver_email,
    subject: 'Copiel 임시 비밀번호 발송',
    text: '임시 비밀번호: ' + userTempPassword,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('이메일 발송 중 오류 발생: ', error);
    } else {
      console.log('이메일이 성공적으로 발송되었습니다.');
    }
  });
};
