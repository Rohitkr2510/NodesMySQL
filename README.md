**Project: nodesmysql**

## Description
This project is a Node.js application with MySQL database integration for managing hospital and patient information. It provides API endpoints for patient registration, fetching hospital details, and more.

## Libraries/Frameworks Used
- **bcryptjs** (v2.4.3): Used for password hashing.
- **body-parser** (v1.20.2): Middleware to parse incoming request bodies.
- **connect-session-sequelize** (v7.1.7): Sequelize store for storing session data.
- **dotenv** (v16.3.1): Loads environment variables from a `.env` file.
- **express** (v4.18.2): Web application framework for Node.js.
- **express-session** (v1.17.3): Session middleware for Express.
- **express-validator** (v7.0.1): Middleware for input validation in Express routes.
- **mysql2** (v3.7.0): MySQL library for Node.js.
- **nodemon** (v3.0.2): Automatically restarts the server during development.
- **sequelize** (v6.35.2): Sequelize ORM for interacting with MySQL database.

## API Endpoints
1. **GET: Welcome Page**
   - Endpoint: `/`
   - Controller Method: `hospitalController.getHospital`

2. **POST: Patient Registration**
   - Endpoint: `/registration`
   - Middleware:
     - Validate `name` is not empty.
     - Validate `address` length is at least 10 characters.
     - Validate `email` is a valid email and not already registered.
     - Validate `phone_number` is a valid phone number with a country code.
     - Validate `password` length is between 8 and 15 characters, contains at least one upper character, one lower character, and a number.
   - Controller Method: `authController.registration`

3. **POST: Fetch Details of Hospitals**
   - Endpoint: `/:hospitalId`
   - Controller Method: `hospitalController.getHospitalById`

## Database
- Database Dump: [database folder](link-to-your-database-dump)
- Database Schema with Data: [database schema file](link-to-your-database-schema)

## Getting Started
1. Clone the repository: `git clone https://github.com/Rohitkr2510/NodesMySQL`
2. Install dependencies: `npm install`
3. Set up your environment variables by creating a `.env` file.
4. Start the server: `npm start`

Feel free to explore the codebase, test the API endpoints using Postman or Swagger, and review the database structure. If you have any questions or issues, please don't hesitate to contact.
