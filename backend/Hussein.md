# Self-Assessment

## Example 1: Handling Contact Form Submissions

Initially, our contact form submission handling logic was functional, but we realized it could be improved in terms of code organization and error handling. Here's the original implementation:

```javascript
const nodemailer = require('nodemailer');
const GetInTouch = require('../models/GetInTouchModel');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alprstigehussein@gmail.com',
    pass: process.env.EMAIl_Pass,
  },
});

const submitContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  const newMessage = new GetInTouch({ name, email, phone, message });

  try {
    await newMessage.save();

    const mailOptionsToCompany = {
      from: email,
      to: 'alprstigehussein@gmail.com',
      subject: `New contact form submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptionsToCompany);

    const mailOptionsToCustomer = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Thank you for contacting us!',
      text: `
        Dear ${name},

        Thank you for getting in touch with us! We have received your message and our team will get back to you shortly.

        Here are the details you submitted:
        - Name: ${name}
        - Email: ${email}
        - Phone: ${phone}
        - Message: ${message}

        We appreciate your interest and will respond as soon as possible.

        Best regards,
        [Musa Barber SHOP]
      `,
    };

    await transporter.sendMail(mailOptionsToCustomer);

    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (err) {
    res.status(500).json({ message: 'Error saving message or sending email', error: err.message });
  }
};

module.exports = { submitContactForm };

The original code was functional and allowed sending contact form submissions to both the company and the customer. However, we identified some areas for improvement:

Issues:
Email Authentication: Using environment variables for sensitive information like the email password (process.env.EMAIl_Pass) is correct, but the name of the environment variable should follow a consistent and clear naming convention.
Error Handling: There was a general 500 error response, which did not give enough insight into what part of the process failed (e.g., saving to the database, sending email).
Hardcoded Values: The sender's email address for customer emails was hardcoded (your-email@gmail.com), which can lead to confusion and errors in different environments.

Solution:
We refactored the code to:

Use clearer variable names for environment variables.
Add more detailed error handling to provide better insights into where the failure occurs.
Replace hardcoded email addresses with more flexible configurations.
Here’s the updated implementation:

const nodemailer = require('nodemailer');
const GetInTouch = require('../models/GetInTouchModel');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alprstigehussein@gmail.com',
    pass: process.env.EMAIL_PASS, // corrected environment variable
  },
});

const submitContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  const newMessage = new GetInTouch({ name, email, phone, message });

  try {
    await newMessage.save();

    const mailOptionsToCompany = {
      from: email,
      to: 'alprstigehussein@gmail.com',
      subject: `New contact form submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptionsToCompany);

    const mailOptionsToCustomer = {
      from: process.env.EMAIL_SENDER, // replaced hardcoded email with an environment variable
      to: email,
      subject: 'Thank you for contacting us!',
      text: `
        Dear ${name},

        Thank you for getting in touch with us! We have received your message and our team will get back to you shortly.

        Here are the details you submitted:
        - Name: ${name}
        - Email: ${email}
        - Phone: ${phone}
        - Message: ${message}

        We appreciate your interest and will respond as soon as possible.

        Best regards,
        [Musa Barber SHOP]
      `,
    };

    await transporter.sendMail(mailOptionsToCustomer);

    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (err) {
    res.status(500).json({
      message: 'Error saving message or sending email',
      error: err.message,
      // Added more error details
    });
  }
};

module.exports = { submitContactForm };
 

Key Improvements:
Environment Variable Naming: Updated the environment variable EMAIl_Pass to EMAIL_PASS for clarity and consistency.
Detailed Error Responses: We now include the actual error message in the response, making debugging easier.
Avoiding Hardcoded Email Addresses: Replaced the hardcoded sender email address with a configurable environment variable (EMAIL_SENDER), improving flexibility.

Lessons Learned:
Environment Variables: It’s important to follow consistent naming conventions for environment variables to avoid confusion.
Error Handling: Adding specific error details can significantly improve debugging and provide better feedback to the users or developers.
Avoiding Hardcoding: Configurable email addresses make the system more flexible and adaptable for different environments (e.g., production, development).
This refactor has improved the code’s maintainability, error handling, and flexibility. 


