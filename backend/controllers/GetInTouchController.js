const nodemailer = require('nodemailer');
const GetInTouch = require('../models/GetInTouchModel');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alprstigehussein@gmail.com',
    pass: process.env.
    EMAIl_Pass,
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
