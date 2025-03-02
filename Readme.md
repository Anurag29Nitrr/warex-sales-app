Warex Sales App Backend

This is a Node.js + MongoDB + Express backend application developed for the Backend Developer Intern Assignment @Warex. It provides a server-side solution for a sales order system where salesmen (users) can manage SKUs, customers, and orders, while an admin can oversee all orders, receive real-time WebSocket notifications, and access hourly reports.

Features
- Authentication & RBAC: User signup/login with JWT; admin role set via MongoDB.
- SKU Management: Users can create and view their SKUs.
- Customer Management: Users can create and view their customers.
- Order Management: Users create orders with unique OD-##### IDs; admin views all orders.
- WebSocket Notifications: Admins receive real-time order updates.
- Admin Reports: Hourly order summaries via cron job.

Tech Stack
- Node.js: Server runtime.
- Express: Web framework for API routes.
- MongoDB: NoSQL database with Mongoose ORM.
- JWT: Authentication tokens.
- Bcrypt: Password hashing.
- Socket.IO: Real-time notifications.
- Node-Cron: Scheduled hourly reports.

Prerequisites
- Node.js: v20.9.0 or later
- MongoDB: Local instance running
- Git: For cloning the repo
- Postman: For API testing

Setup Instructions
1. Clone the Repository:
   git clone https://github.com/Anurag29Nitrr/warex-sales-app.git
   cd warex-sales-app

2. Install Dependencies:
   npm install

3. Start MongoDB:
   - Ensure MongoDB is running locally:
     mongod or mongosh (for 6.0 + verions)

4. Run the Server:
   node app.js
   - Server runs on http://localhost:3000.

Admin Setup
- Create Admin User:
  - Use the signup API to create admin_user (see Postman collection).
- Set Admin Role:
  - In MongoDB shell:
    use sales_order_app
    db.users.updateOne({ username: "admin_user" }, { $set: { role: "admin" } })

API Endpoints
Test all APIs using the provided Postman collection (Warex.postman_collection.json):

- Auth:
  - POST /api/auth/signup: Register a user.
  - POST /api/auth/login: Get JWT token.
- SKUs (User):
  - POST /api/skus: Create SKU.
  - GET /api/skus: Fetch user’s SKUs.
- Customers (User):
  - POST /api/customers: Create customer.
  - GET /api/customers: Fetch user’s customers.
- Orders (User/Admin):
  - POST /api/orders: Create order.
  - GET /api/orders: Fetch user’s orders.
  - GET /api/orders/all: Fetch all orders (admin only).
- Reports (Admin):
  - GET /api/reports/hourly: Fetch hourly summaries.
  - POST /api/reports/generate-hourly: Generate hourly report manually.

Postman Testing
1. Import Warex.postman_collection.json (see submission email).
2. Set base_url (default: http://localhost:3000).
3. Run login requests to set user_token and admin_token.
4. Test all APIs in sequence.

WebSocket Testing
- Open test_socket.html in a browser.
- Replace the token with admin_token from the admin login response.
- Send a POST /api/orders request to see real-time notifications in the console.

Submission Details
- Code: This repository or warex-sales-app.zip.
- Postman Files: Included with submission email.
- Admin Credentials: 
  - Username: admin_user
  - Password: adminpass

Notes
- Ensure MongoDB is running before starting the server.
- Tokens are JWT-based; regenerate via login if expired.
- node_modules/ is excluded via .gitignore—install dependencies locally.

Thank you for reviewing my work!