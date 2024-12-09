# Multi-Level Referral and Earning System

This project implements a multi-level referral and earning system with real-time data updates. Users can refer up to 8 people directly and earn profits based on a hierarchical referral structure. The system includes features such as earnings calculation, live notifications, and detailed reports.

---

## Features

- **User Management**: Add users with referral tracking and hierarchical relationships.
- **Profit Distribution**:
  - Direct earnings: 5% of profits from direct (level 1) referrals.
  - Indirect earnings: 1% of profits from indirect (level 2)  referrals.
  - Minimum purchase threshold of 1000Rs for earnings.
- **Real-Time Notifications**: Updates sent to users when they earn from transactions.
- **Reports and Analytics**:
  - Referral-based earnings breakdown.
  - Earning sources from each leg of the referral tree.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Real-Time Notifications**: WebSocket (ws)
- **Tools**: Postman for API testing and real time notification testing

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/multi-level-referral-system.git
   cd multi-level-referral-system-backend
2. **Installation**:
   ```bash
   npm install
3. **Set up the environment variables**: Create a .env file in the root directory with the following content:
   ```bash
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/referralSystem
4. **Start the server**: Make sure your MongoDB is running
   ```bash
   npm start
