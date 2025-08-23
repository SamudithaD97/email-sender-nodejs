const express = require('express');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.email',
  secure: false,
  service: 'gmail',
  auth: {
    user: 'develysiancrest@gmail.com',
    pass: 'syctdvhbkssepxru',
  },
});

const app = express();
const port = 3005;

app.get('/', async (_, res) => {
  const source = fs.readFileSync('email_template.html', 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    username: 'Samuditha',
  };
  const htmlToSend = template(replacements);

  const info = await transporter.sendMail({
    from: 'develysiancrest@gmail.com',
    to: 'samudithawijesundara@gmail.com',
    subject: 'Hello from node',
    text: 'Hello world?', // dont really need this but it is recommended to have a text property as well
    html: htmlToSend
  });

  console.log('Message sent: %s', info.response);
  res.send('Email Sent!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});