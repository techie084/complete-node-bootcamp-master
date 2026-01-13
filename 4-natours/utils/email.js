const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  //  create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the email option
  const mailOptions = {
    from: 'Wisdom Matthew <hello@wisdom.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  // Actually send the mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
