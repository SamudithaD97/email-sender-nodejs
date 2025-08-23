// server.js
const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');
const { EmailService, port } = require('./emailService');

const app = express();

const emailService = new EmailService();

app.get('/', async (_, res) => {
  const source = fs.readFileSync('email_template.html', 'utf-8').toString();
  const template = handlebars.compile(source);
  const contentArray = [
    {
        main: 'Topic 1',
        subs: [
          
        ]
    }
];

  const replacements = {
    headerName: 'Welcome Vaaney',
    headerDescription: 'Welcome to our community. Here are some important messages for you:',
    content: contentArray 
  };
  const htmlToSend = template(replacements);
  const sendEmail = 'samudithawijesundara@gmail.com';
  const subject = 'Welcome to Vaaney';
  const info = await emailService.sendEmail(sendEmail, subject , htmlToSend);

  console.log('Message sent: %s', info);
  res.send('Email Sent!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
