import nodemailer from 'nodemailer';

const sender = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingEmail = async (to: string, bookingData: any) => {
  const { title, date, time, price } = bookingData;

  const mailOptions = {
    from: `Fresh Line Barber <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Booking Confirmation',
    text: `Hi!\n\nYour ${title} booking for ${price}kr on ${date} at ${time} has been confirmed. \n\nThank you for choosing our service.\n\nBest regards, \nFresh Line Barber`,
  };
  await sender.sendMail(mailOptions);
};
