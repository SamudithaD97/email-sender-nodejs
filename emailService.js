// emailService.js
const nodemailer = require('nodemailer');

const port = 3005; 

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.email',
      secure: false,
      service: 'gmail',
      auth: {
        user: 'test@gmail.com',
        pass: '',
      },
    });
  }

  async sendEmail(to, subject, htmlContent) {
    const info = await this.transporter.sendMail({
      from: 'test@gmail.com',
      to: to,
      subject: subject,
      html: htmlContent
    });

    return info.response;
  }

  getPort() {
    return port;
  }
}

module.exports = { EmailService, port };
