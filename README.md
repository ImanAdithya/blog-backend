<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Project Overview

This project is a backend API built with **NestJS** that provides:

- **User Authentication** using JWT with login, logout, and registration.
- **Blog CRUD** operations to create, read, update, and delete blog posts.
- **Unit Testing** with Jest to ensure code quality and reliability.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Features

### Authentication

- **Register** a new user with hashed password storage.
- **Login** with username and password, returning a JWT token.
- **Logout** support by token blacklist (demo implementation).
- **JWT-based authorization** for protected routes.

### Blog Management

- Create new blog posts.
- Retrieve all or single blog posts.
- Update existing blog posts.
- Delete blog posts.

### Testing

- Unit tests for services and controllers.
- Mock dependencies for isolated tests.
- Test coverage for authentication and blog features.

---

## Tech Stack

- [NestJS](https://nestjs.com/) - Node.js framework
- [TypeScript](https://www.typescriptlang.org/)
- [JWT](https://jwt.io/) - JSON Web Token for auth
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- [Jest](https://jestjs.io/) - Testing framework

---

## Getting Started

### Prerequisites

- Node.js >= 16
- npm or yarn
- A database (e.g., PostgreSQL, MySQL) and its connection configured (if used)

### Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
# or
yarn install
```

### Running the App

```bash
npm run start:dev
# or
yarn start:dev
```

The server will run on `http://localhost:3000` by default.

---

## API Endpoints

### Auth

- `POST /auth/register` - Register a new user  
- `POST /auth/login` - Login and receive JWT token  
- `POST /auth/logout` - Logout user (token blacklist)

### Blog

- `GET /blogs` - Get all blogs  
- `GET /blogs/:id` - Get blog by ID  
- `POST /blogs` - Create new blog (protected)  
- `PATCH /blogs/:id` - Update blog (protected)  
- `DELETE /blogs/:id` - Delete blog (protected)

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
