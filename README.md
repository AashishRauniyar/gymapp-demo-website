# User Management API

A robust user management API built with Node.js, Express, and Prisma. This API handles user registration, login, and profile management, providing secure and efficient ways to manage user data.

## Features

- **User Registration**: Create a new user with name, email, password, age, gender, weight, and height.
- **User Login**: Authenticate users and generate JWT tokens.
- **User Profile Management**: Retrieve and update user profiles.
- **User List**: Fetch a list of all users.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building RESTful APIs.
- **Prisma**: ORM for database access and management.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **PostgreSQL**: Relational database for storing user data.

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aashishrauniyar/user-profile-management-api.git
   cd your-repository
# Project Setup

## Install Dependencies

```bash
npm install
```
## Configure Environment Variables

Create a .env file in the root directory and add the following variables:
```
env

DATABASE_URL=postgresql://username:password@localhost:5432/your-database
JWT_SECRET=your_jwt_secret_key
```
Replace username, password, localhost, and your-database with your PostgreSQL credentials and database name. Set your_jwt_secret_key to a strong secret key for JWT signing.
Run Migrations

##  Initialize your database schema:
```
bash

npx prisma migrate dev

Start the Server

bash

npm start
```
 The server will be running at http://localhost:3000.
## API Endpoints
1. Register User

    -Endpoint: POST /register

    -Request Body:

    json
```
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "age": 25,
      "gender": "male",
      "weight": 70.5,
      "height": 175.0
    }
```
    Response: Returns the created user object.

2. Login User

    Endpoint: POST /login

    Request Body:

    json
```
    {
      "email": "john@example.com",
      "password": "password123"
    }
```
    Response: Returns a JWT token.

3. Get All Users

    Endpoint: GET /userlist
    Response: Returns an array of user objects.

4. Get User Profile

    Endpoint: GET /profile

    Headers:

    http

    Authorization: Bearer <your_jwt_token>

    Response: Returns the user profile object.

5. Update User Profile

    Endpoint: PUT /profile

    Headers:

    http

Authorization: Bearer <your_jwt_token>

Request Body:

json
```
    {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 26,
      "gender": "male",
      "weight": 71.0,
      "height": 176.0
    }
```
    Response: Returns the updated user profile object.

## Testing

You can run tests using a testing framework of your choice. Ensure to set up your test environment variables appropriately.
Contributing

    Fork the repository.
    Create a new branch (git checkout -b feature/your-feature).
    Commit your changes (git commit -am 'Add new feature').
    Push to the branch (git push origin feature/your-feature).
    Create a new Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements

    Prisma
    Express
    bcryptjs
    jsonwebtoken
    PostgreSQL

