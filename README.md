# Movie Ticket Booking App

This project is a full-stack movie ticket booking application built with React for the frontend and Node.js/Express for the backend. It allows users to sign up, sign in, browse movies, book tickets, and view their bookings.

## Table of Contents

- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Getting Started

To get started with the project, follow the steps below to set up both the frontend and backend.

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```sh
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the frontend development server:**
   ```sh
   npm start
   ```

   The app will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Backend Setup

1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file in the backend directory and add the following environment variables:**
   ```properties
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the backend server:**
   ```sh
   node server.js
   ```

   The backend server will run on [http://localhost:5000](http://localhost:5000).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

Ejects the Create React App configuration.

## Project Structure

### Frontend

- `src/components`: Reusable components such as Navbar, TicketBooking, UserProfileEdit, etc.
- `src/pages`: Page components such as Home, SignIn, SignUp, Admin, etc.
- `src/api.js`: Axios instance for making API requests.
- `src/index.js`: Entry point for the React application.
- `src/App.js`: Main application component.

### Backend

- `models`: Mongoose models for User, Movie, and Booking.
- `routes`: Express routes for authentication, movies, and bookings.
- `controllers`: Controller functions for handling business logic.
- `middlewares`: Middleware functions for authentication.
- `config/db.js`: Database connection configuration.
- `server.js`: Entry point for the backend server.

## API Endpoints

### Authentication

- `POST /api/auth/signup`: Sign up a new user.
- `POST /api/auth/signin`: Sign in an existing user.
- `GET /api/auth/profile`: Get the profile of the authenticated user.

### Movies

- `POST /api/movies`: Add a new movie (Admin only).
- `GET /api/movies`: Get all movies.
- `GET /api/movies/:id`: Get details of a specific movie.
- `DELETE /api/movies/:id`: Delete a movie (Admin only).

### Bookings

- `POST /api/bookings`: Book tickets for a movie.
- `GET /api/bookings/show-tickets`: Get bookings of the authenticated user.
- `GET /api/bookings/reserved-seats/:movieId`: Get reserved seats for a specific movie.

## License

This project is licensed under the MIT License.
