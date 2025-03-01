import nodemailer from 'nodemailer';
import config from '../app/config';

const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: 'masumbillah2062003@gmail.com',
      pass: 'bqgk zkid blwa ztdc',
    },
  });

  await transporter.sendMail({
    from: 'masumbillah2062003@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins! ✔', // Subject line
    text: '', // plain text body
    html, // html body
  });
};

export default sendEmail;
