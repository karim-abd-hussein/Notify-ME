
# Notify Me Application

The **Notify Me** application is a robust notification and messaging system built using **NestJS** and **TypeScript**, adhering to SOLID principles. It incorporates **Socket.IO** for real-time chat, **JWT** for authentication, and **MongoDB** with **Mongoose** for data storage.

---

## Features

- **User Authentication:** Secure sign-up and login with JWT.
- **Real-Time Chat:** Interactive chat using Socket.IO.
- **User Management:** CRUD operations for users.
- **Contact Management:** Register and manage contacts with full CRUD functionality.
- **Scalable Design:** Built with SOLID principles for maintainability and scalability.

---

## Project Structure

```
src/
├── auth/               # Authentication module (JWT, Guards, Strategies)
├── active-users/       # manage active users
├── chat/               # Chat module (Socket.IO integration)
├── messages/           # messages management (CRUD for messages)
├── users/              # User management (CRUD for users)
├── common/             # Shared utilities and interceptors
├── app.module.ts       # Root module
├── main.ts             # Entry point
```

---

## Prerequisites

- **Node.js** (>= 18.x)
- **MongoDB** (Database connection)
- **npm** or **yarn**

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/karim-abd-hussein/Notify-ME
   cd notify-me
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/NotifyME
   SECRET_KEY=your_jwt_secret
   ```

4. Start the development server:

   ```bash
   npm run start:dev
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

---

## API Endpoints

### User Endpoints

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| POST   | `/users`               | Register a new user  |
| POST   | `/users/log-in`        | User login           |
| GET    | `/users/:phone`        | Get user by phone    |
| PUT    | `/users/:phone`        | Update user details  |
| DELETE | `/users/:phone`        | Delete a user        |

### Contact Endpoints

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| PUT    |`/users/add-contact`  | Create a new contact       |
| GET    | `/users/get`         | Get all contacts           |
| PUT    | `/users/:phone`      | Update contact details     |
| DELETE | `/users/:phone`      | Delete a contact           |

### Chat Endpoints

| Method | Endpoint            | Description                 |
|--------|---------------------|-----------------------------|
| GET    | `/`                 | Establish socket connection |

---

## Modules and Key Features

### Authentication Module (`auth`)

- **JWT Authentication**

### Chat Module (`chat`)

- Real-time communication with **Socket.IO**

### User Module (`users`)

- User entity with validation
- CRUD operations

### Contact Module (`contacts`)

- CRUD operations for managing contacts
- Mongoose schemas and validation

---

## Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the application in production:

   ```bash
   npm run start:prod
   ```

---

## Technologies Used

- **NestJS**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Socket.IO**
- **JWT** for authentication
---

## SOLID Principles in Action

- **Single Responsibility Principle:** Separate modules for users, contacts, and chat.
- **Open/Closed Principle:** Extensible guards and strategies.
- **Liskov Substitution Principle:** Interfaces for services and repositories.
- **Interface Segregation Principle:** Lightweight, focused interfaces.
- **Dependency Inversion Principle:** Services depend on abstractions.

---

## Contact

For queries or support, please reach out to:

- **Email:** karimabdhussein@gmail.com
<!-- - **Website:** [Notify Me](https://notifyme.com) -->






