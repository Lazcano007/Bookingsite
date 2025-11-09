# Fresh Line Barber – Booking App

A full-stack booking application. Users can register, log in, book appointments, and view history. Admins can view all bookings and manage users.

---

## Features

**Auth & profile:** Registration, login, JWT, role-based access (user/admin).

**Bookings:** Create, list upcoming, view history, cancel, and prevent double-booking per date/time.

**Admin:** See all bookings, user CRUD, promote users to admin.

**Email:** Booking confirmation email (Resend in production, Gmail/Nodemailer in local dev).

**Frontend:** React + TypeScript, custom calendar, toasts/feedback, protected routes.

**Backend:** Express + TypeScript, MongoDB (Mongoose), CORS, structured controllers/middlewares.

**Deploy:** Backend on Render and frontend on Netlify.

---

## Tech Stack

**Frontend:** React, TypeScript, Axios, Vite

**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT

**Email:** Resend (HTTP API) in prod / Nodemailer (Gmail App Password) in dev

**Database:** MongoDB Atlas

**Quality:** ESLint (Airbnb), Prettier