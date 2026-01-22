<<<<<<< HEAD
<<<<<<< HEAD
# E-commerce
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
=======
# E-Commerce App

## Overview
A simple e-commerce application where users can browse products, add items to cart, and place orders.

## Features
- User authentication
- Product browsing
- Shopping cart
- Order placement

## API Contract
- Authentication
- Products
- Cart (Authenticated)
- Orders (Authenticated)

## Tech Stack
- Next.js
- React
- Backend: Node.js (planned)  
- Auth: JWT (planned)
>>>>>>> 745e067 (Initial commit: project scaffold and setup)

## Getting Started
(You can keep the Next.js instructions here)

#### Authentication APIs

### Register user
POST /api/auth/register

Request:
{
  "name": "John",
  "email": "john@email.com",
  "password": "secret123"
}

Response:
{
  "id": "u1",
  "name": "John",
  "email": "john@email.com"
}

---

### Login user
POST /api/auth/login

Request:
{
  "email": "john@email.com",
  "password": "secret123"
}

Response:
{
  "token": "JWT_TOKEN"
}

#### Cart APIs (Authenticated)

### Get current cart
GET /api/cart

Response:
{
  "id": "c1",
  "items": [
    {
      "productId": "p1",
      "name": "Shoes",
      "price": 99,
      "quantity": 2
    }
  ]
}

---

### Add item to cart
POST /api/cart/items

Request:
{
  "productId": "p1",
  "quantity": 1
}

<<<<<<< HEAD
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 3101ef4 (Initial commit from Create Next App)
=======
>>>>>>> 745e067 (Initial commit: project scaffold and setup)
