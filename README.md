# Activity Booking App

Activity Booking App built using **Node.js**, **Express.js**, and **MongoDB**.

## Features
- User registration and login with JWT authentication
- Public API to list activities
- Authenticated booking of activities
- View bookings for logged-in user

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Aazim-Sadan/activity_booking_app.git
cd activity_booking_app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file in the root directory and add the following:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_jwt_secret
```

### 4. Run the server
```bash
npm start
```

Server will be running at `http://localhost:8000`.

---

## API Endpoints

### Auth
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/login` - Login user and receive JWT token

### Activities
- `GET /api/v1/activity` - List all activities (Public)
- `POST /api/v1/activity` - Create a new activity (Public)

### Bookings
- `GET /api/v1/booking/:id` - Book an activity (Protected)
- `GET /api/v1/booking` - Get logged-in user's bookings (Protected)
