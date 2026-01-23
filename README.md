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