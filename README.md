# Project Title

Dining Venue Web Application

## Description

This project is a web application designed for a dining venue, allowing users to explore menus, place orders, and manage their profiles. The application is built using Next.js and Tailwind CSS, providing a responsive and modern user interface.

## Accessing the Repository

To access this private repository, you must be added as a contributor by the repository owner. Once you have been granted access, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dining-venue-web.git
   cd dining-venue-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   If getting conflict error run : 
   ```bash 
   npm install --legacy-peer-deps
   ```

3. Create a `.env` file based on the `.env.example` file and fill in the required environment variables.

## Project Structure Overview

- **src/**: Contains the main application code.
  - **app/**: Contains the application routes and pages.
  - **api/**: Contains the (Backend) API routes for handling requests.
  - **components/**: Contains reusable UI components.
  - **libs/**: Contains utility functions and libraries used across the application.
  - **models/**: Contains data models for MongoDB collections.

## Routing

The application uses Next.js routing, where each file in the `src/app` directory corresponds to a route. For example, `src/app/about-us/page.js` maps to the `/about-us` route.

## Authentication

Authentication is handled using Firebase. The application uses Firebase Authentication to manage user sign-up, sign-in, and session management. The authentication logic is implemented in the `src/app/api/auth/[...nextauth]` route.

## Features

- User authentication and profile management
- Menu browsing and item details
- Cart functionality for placing orders
- Feedback submission
- Responsive design for mobile and desktop

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Node.js
- Express.js
- MongoDB (for data storage)
- Firebase (for authentication)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dining-venue-web.git
   cd dining-venue-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and fill in the required environment variables.

## Usage

To start the development server, run the following command:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.

