# hackerbay-backend
[![Build Status](https://travis-ci.com/Akinmyde/hackerbay-backend.svg?branch=Develop)](https://travis-ci.com/Akinmyde/hackerbay-backend)
[![Maintainability](https://api.codeclimate.com/v1/badges/eb0d682e7ff60515041b/maintainability)](https://codeclimate.com/github/Akinmyde/hackerbay-backend/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/Akinmyde/hackerbay-backend/badge.svg)](https://coveralls.io/github/Akinmyde/hackerbay-backend)
[![CircleCI](https://circleci.com/gh/Akinmyde/hackerbay-backend.svg?style=svg)](https://circleci.com/gh/Akinmyde/hackerbay-backend)

## Getting Started

### Prerequisites

These are the required tools get started

* [Node](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)

To download dependencies 

```
npm install 
```

To start application

```
npm start
```

to test application

```
npm start
```

### Features
- Signup a user: `POST https://hackerbay-backend.herokuapp.com/api/v1/auth/signup`
- Login a user: `POST https://hackerbay-backend.herokuapp.com/api/v1/auth/login`
- Generate a thumbnail image: `POST https://hackerbay-backend.herokuapp.com/api/v1/thumbnail`
- Patch Json: `POST https://hackerbay-backend.herokuapp.com/api/v1/patch`

#### Dependencies
- Express JS: Web application framework for Node.js.
- Body-Parser: Parse incoming request bodies in a middleware before your handlers, available under the req.body property
- Babel: The compiler for writing next generation JavaScript (es6 and above).
- Cloudinary: to store image on the cloud
- Cors: Allow app to use used on other origin
- Dotenv: Access environment variable
- jsonwebtoken: for encoding and decoding token
- lodash.isempty: for validation
- morgan: to log user request
- password-hash: for hashing user password before saving to the database
- pg: to communicate with postgress database
- validate: used for validation

#### Dev Dependencies
- Coveralls: Helps to show which part code is not covered by test suite
- Eslint: Linting utility for JavaScript
- Airbnb: Javascript style guide
- Mocha & Supertest: Testing the Web Application
- Nodemon: Utility that will monitor for any changes in your source and automatically restart your server.
- nyc: For showing test coverage report
- expect: Assertion library for testing

### How To Contribute
- Fork the project & clone locally.
- Branch for each separate piece of work `$ git checkout -b <branch-name>`
- Do the work, write good commit messages.
- Push to your origin repository.
- Raise a PR on GitHub.
- Wait for approval.

#### Author
Akinremi Olumide J.
twitter: @akinmyde

