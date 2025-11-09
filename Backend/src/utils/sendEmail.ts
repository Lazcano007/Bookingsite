import nodemailer from 'nodemailer';
import 'dotenv/config';
import { Resend } from 'resend';

const useResend = Boolean(process.env.RESEND_API_KEY);
const resend = useResend
  ? new Resend(process.env.RESEND_API_KEY as string)
  : null;

const sender = !useResend
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null;

if (sender) {
  sender.verify((err) => {
    if (err) console.error('SMTP verify fail:', err);
    else console.log('SMTP ready to send');
  });
}

export async function sendBookingEmail(to: string, booking: any) {
  if (!to) return;
  const { title, date, time, price } = booking;
  const subject = 'Booking Confirmation';
  const text = `Hi!\n\nYour ${title} booking for ${price}kr on ${date} at ${time} has been confirmed. \n\nThank you for choosing our service.\n\nBest regards, \nFresh Line Barber`;
  const from =
    process.env.EMAIL_FROM ||
    (process.env.EMAIL_USER
      ? `Fresh Line Barber <${process.env.EMAIL_USER}>`
      : 'Fresh Line Barber <no-reply@example.com>');

  try {
    if (useResend && resend) {
      await resend.emails.send({
        from,
        to,
        subject,
        text,
      });
      return;
    }
    if (sender) {
      await sender.sendMail({
        from,
        to,
        subject,
        text,
      });
      return;
    }
    console.warn('The confirmation email was not sent: no sender configured.');
  } catch (err: any) {
    console.error('Email send error:', err?.message || err);
  }
}
