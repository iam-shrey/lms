Library Management System (LMS)
A Library Management System (LMS) built with React for the frontend and Spring Boot for the backend. This application allows users to manage books, make book requests, and keep track of their requests. The system is designed to provide an easy-to-use interface for managing library books and book requests efficiently.

Features
User Dashboard: Users can view and manage their book requests.
Book Management: Admins can add, update, and remove books from the system.
Book Requests: Users can request books and cancel them if needed.
Book Update: Admins can update book information, including title, author, publisher, and quantity.
Technologies Used
Frontend: React, Axios (for making HTTP requests)
Backend: Spring Boot (REST APIs)
Database: MySQL (for storing user data and books)
Authentication: JWT (JSON Web Token) for secure user authentication
Styling: Tailwind CSS for responsive and modern UI design
Getting Started
To run this project locally, follow these steps:

Prerequisites
Node.js (for the frontend):

Install Node.js from here.
Java (for the backend):

Install Java JDK (version 23 or later) from here.
MySQL:

Install MySQL from here.
Maven (for building Spring Boot project):

Install Maven from here.
Backend Setup (Spring Boot)
Clone the backend repository:

bash
Copy code
git clone https://github.com/iam-shrey/lms-backend.git
cd lms-backend
Create a MySQL database and configure it in application.properties:

properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/lms
spring.datasource.username=root
spring.datasource.password=your_password
Build and run the Spring Boot application:

bash
Copy code
mvn spring-boot:run
The backend should now be running on http://localhost:8080.

Frontend Setup (React)
Clone the frontend repository:

bash
Copy code
git clone https://github.com/iam-shrey/lms-frontend.git
cd lms-frontend
Install the required dependencies:

bash
Copy code
npm install
Start the React development server:

bash
Copy code
npm start
The frontend should now be accessible at http://localhost:5173.

User-Based Authentication with JWT
The Library Management System uses JWT (JSON Web Token) for secure user authentication. When a user logs in, the backend generates a JWT token and sends it back to the frontend. This token must be included in the header of every request that requires authentication.

User Login
User Email ID: shr125@gmail.com
Password: 2580
The user logs in by submitting their credentials, and the backend returns a JWT token.

Admin Email ID: shreytripti26@gmail.com
Password: 2580
The admin has the same authentication flow as users, but with elevated permissions (i.e., access to add, update, or delete books).

Using JWT Token
Once a user or admin is logged in, the received JWT token must be included in the Authorization header for any API request that requires authentication:

bash
Copy code
Authorization: Bearer <jwt_token>
This ensures that the backend verifies the token and grants access to protected routes like book management and requests.

API Endpoints
User Endpoints:
GET /books: Retrieve all available books.
POST /book-requests/request: Create a new book request (Requires user authentication).
DELETE /book-requests/cancel/{requestId}: Cancel an existing book request.
Admin Endpoints:
GET /books: Retrieve all books in the library (Admin view).
POST /books: Add a new book to the library (Admin only).
PUT /books/{id}: Update an existing book (Admin only).
DELETE /books/{id}: Delete a book from the library (Admin only).
Contributing
Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request. Here's how you can contribute:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Make your changes and commit them (git commit -am 'Add new feature').
Push to the branch (git push origin feature-name).
Submit a pull request.
