# Spec

## Please read this first
I did not know how to create spec file for an application and it is my first time creating one. Apologies for any format issues or missing information. 

Also for some of the libraries I have used help from internet to write about the exact usage of the libraries. 

## Libraries and Technologies Used

##axios
__Version__: 1.4.0

__Purpose/Description__: Axios is a JavaScript library used for making HTTP requests o external APIs or servers. It provides a simple and intuitive API for performing various types of requests, such as GET, POST, PUT, DELETE, etc. 

__Integration/Usage__: Axios is utilized in the code to communicate with google api for getting the access token when it expires or is about to expire. It facilitates the retrieval and manipulation of data from remote sources.

##body-parser
__Version__: 1.20.2

__Purpose/Description__: Body-parser is a middleware module for Express.js that parses the request body and makes it available under the req.body property, allowing easy access to form data and JSON payloads.

__Integration/Usage__: Body-parser is integrated into the Express.js server to parse incoming request bodies. 

##dotenv
__Version__: 16.3.1

__Purpose/Description__: Dotenv is a module that loads environment variables from a .env file into Node.js's process.env. It allows us to store secretive or configuration related information in a separate file.

__Integration/Usage__: Dotenv is used in the envConfig.js configuration file that aims to provide access to environment variables in the application.

##express
__Version__: 4.18.2

__Purpose/Description__: Express.js is a popular web application framework for Node.js. It provides a set of robust features and middleware to simplify the development of server-side applications and APIs. Express offers routing, request handling, middleware integration, and template rendering capabilities.

__Integration/Usage__: Express.js is used to setup the HTTP server, handle routing in the application and also to provide the middleware support in the application.

##express-session
__Version__: 1.17.3

__Purpose/Description__: Express-session is a middleware module for Express.js that enables session management for application. It provides a way to store session data on the server and associate it with each client's request using a session identifier.

__Integration/Usage__: Express-session is integrated into the Express.js server to manage user sessions. It allows for the storage and retrieval of session data, such as user authentication state or user-specific information.

##googleapis
__Version__: 120.0.0

__Purpose/Description__: Googleapis is a package that provides an interface to various Google APIs, including Google OAuth2, Gmail, Calendar, Drive, etc. It simplifies the process of interacting with Google services by providing a set of methods and objects to handle authentication, request execution, and response handling.
__Integration/Usage__: Googleapis is used in the application to interact with the Gmail API. It enables functionalities such as accessing user emails, managing labels, and sending emails.

##mongoose
__Version__: 7.3.1

__Purpose/Description__: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides support to define schemas, perform CRUD operations, and handle data validation.

__Integration/Usage__: Mongoose is used to interact with the MongoDB database in the application. It handles data modeling, schema definition, and database operations such as querying, inserting, updating, and deleting data for the persisting the tokens.

##passport
__Version__: 0.6.0

__Purpose/Description__: Passport is an authentication middleware for Node.js. It provides a flexible and modular approach to handle user authentication using various strategies, such as username/password, OAuth, JWT, etc. Passport simplifies the authentication process and integrates seamlessly with Express.js applications.

__Integration/Usage__: Passport is integrated into the application to handle user authentication using the Google OAuth2 strategy. It manages the authentication flow, session management, and user serialization/deserialization.

##passport-google-oauth20
__Version__: 2.0.0

__Purpose/Description__: Passport-google-oauth20 is a Passport strategy that allows for Google OAuth2 authentication. It provides the necessary configuration and methods to authenticate users using their Google accounts.

__Integration/Usage__: Passport-google-oauth20 is used as a strategy within the Passport authentication middleware to enable Google OAuth2 authentication. 

##winston
__Version__: 3.9.0

__Purpose/Description__: Winston allows us to log messages with different levels, such as info, debug, warning, and error, and supports various log destinations, including the console and files.

__Integration/Usage__: Winston is integrated into the application to handle logging and log events, errors, and debugging information.