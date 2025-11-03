# Booking App - (Backend Documentation)
I created a booking application API that allows the user to create or delete a booked time. If you are an admin you can create, update or delete a user. This application is meant to be for barbers to perfectly plan and view booked appointments.

### Tech-Stack
- Database: MongoDB
- Express.js 
- Node.js

---
### API Endpoints
ADMIN:

All these admin routes require admin privileges.

- `GET /api/admin/profiles` - This gets all the users.
- `GET /api/admin/profiles/:id` - This gets a specific user.
- `POST /api/admin/profiles` - This creates a user.
- `DELETE /api/admin/profiles/:id` - This deletes a user.
- `PUT /api/admin/profiles/:id` - This updates a user.

USER:

All these routes require a registered account.

- `GET /api/bookings/upcoming` - This gets upcoming bookings.
- `POST /api/bookings` - This creates a new booking.
- `DELETE /api/bookings/:id` - This cancels a booking.

---
### Getting started:
To get started you need to have insomnia or postman installed on your computer.
1) Create a folder called "BookingApp" and open it with VSC. Once opened type this command ```git clone https://github.com/Lazcano007/Bookingsite.git```. This is going to clone the project from Github to your computer.

2) Once the clone process is complete type this command ```cd Backend```. This navigates you to the Backend folder.

3) Once inside "Backend" type in this command ```npm install```. It installs everything you need to run the program on your computer.

4) After completing the installation. Create a file called ".env" and add: ````MONGO_URI=<your MongoDB connection string>````
````PORT= 3000````. This establishes the port connection and the connection to the database.

5) After establishing the connection type in this command ```npm run dev```. It starts the application.

6) Lastly start your Insomnia/Postman and test out the different CRUD endpoints in this API.

---
## Deployment
Here is the link for the deployed backend on render: [Booking App Backend (Render)](https://bookingsite-cp9v.onrender.com)

---
## Code-standard
This project follows Airbnb JavaScript Style Guide through "estlintrc.cjs" file in backend. Prettier is also used to ensure consisten code through the whole project as well.