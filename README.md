# Node.js Email Sender

A simple and efficient Node.js feature for sending emails using Gmail SMTP service with Nodemailer.

## Features

- ✉️ Send HTML emails via Gmail SMTP
- 🔒 Secure email authentication
- 📧 Support for custom email templates
- 🚀 Easy-to-use EmailService class
- ⚡ Lightweight and fast

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- A Gmail account
- Gmail App Password (recommended) or Less Secure Apps enabled

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SamudithaDG7/node-js-mail-sender.git
cd node-js-mail-sender
```

2. Install dependencies:
```bash
npm install
```

3. Configure your email credentials:
   - Open `emailService.js`
   - Replace `'test@gmail.com'` with your Gmail address
   - Add your Gmail App Password in the `pass` field

## Gmail Setup

### Option 1: App Password (Recommended)
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings > Security > App passwords
3. Generate an app password for "Mail"
4. Use this 16-character password in your configuration

### Option 2: Less Secure Apps (Not Recommended)
1. Go to your Google Account settings
2. Enable "Less secure app access"
3. Use your regular Gmail password

## Usage

### Basic Email Sending

```javascript
const { EmailService } = require('./emailService');

const emailService = new EmailService();

// Send a simple email
async function sendTestEmail() {
  try {
    const response = await emailService.sendEmail(
      'recipient@example.com',
      'Test Subject',
      '<h1>Hello World!</h1><p>This is a test email.</p>'
    );
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();
```

### With Express Server

```javascript
const express = require('express');
const { EmailService } = require('./emailService');

const app = express();
const emailService = new EmailService();

app.use(express.json());

app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    const response = await emailService.sendEmail(to, subject, html);
    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(emailService.getPort(), () => {
  console.log(`Server running on port ${emailService.getPort()}`);
});
```

## Project Structure

```
node-js-mail-sender/
├── emailService.js      # Main email service class
├── app.js              # Express server implementation
├── server.js           # Server startup file
├── index.js            # Entry point
├── email_template.html # HTML email template
├── package.json        # Project dependencies
├── package-lock.json   # Dependency lock file
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## API Reference

### EmailService Class

#### Constructor
Creates a new EmailService instance with Gmail SMTP configuration.

#### Methods

##### `sendEmail(to, subject, htmlContent)`
Sends an HTML email.

**Parameters:**
- `to` (string): Recipient email address
- `subject` (string): Email subject line
- `htmlContent` (string): HTML content of the email

**Returns:** Promise that resolves to the SMTP response

##### `getPort()`
Returns the configured port number (3005).

## Environment Variables

For production use, consider using environment variables:

```javascript
// .env file
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
PORT=3005
```

## Security Best Practices

- ⚠️ Never commit email credentials to version control
- 🔐 Use App Passwords instead of regular passwords
- 🛡️ Store sensitive data in environment variables
- 🔒 Enable 2-Factor Authentication on your Gmail account


## Acknowledgments

- [Nodemailer](https://nodemailer.com/) for the excellent email library
- Gmail SMTP service for reliable email delivery
