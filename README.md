# E-Commerce App

## Overview
This is a full-stack e-commerce application that allows users to browse products, manage a shopping cart, and place orders. It was built to demonstrate a complete e-commerce workflow with modern frontend and backend technologies. The project emphasizes clean architecture, state management, and API integration.

## Live Demo
Coming soon (optional: add Vercel or Netlify link here)

## Test Account for Demo
You can use the following credentials to explore the app:

Email: Vyde@gmail34.com
Password: Test1234

## Features
User authentication (register/login)

Product catalog browsing

Add/remove items from cart

Cart checkout page

User profile page (personalized view)

API integration with Supabase backend

## Tech Stack
Frontend

Next.js – App routing and SSR

React – Component-based UI

Zustand – Lightweight state management

React Query – Data fetching and caching

Tailwind CSS (optional) – Styling (if used)

Backend

Supabase – All-in-one backend (PostgreSQL, Auth, Realtime)

Planned: Migration to custom backend using Node.js and JWT for authentication

📁 Project Structure (Simplified)

├── app/
│   ├── page.tsx         # Main entry point
│   ├── account/         # User profile page
│   ├── cart/            # Cart and checkout
├── components/          # Reusable UI components
├── stores/               # Zustand state management
├── services/            # API interaction (React Query + Supabase)
├── public/              # Static assets


### API Endpoints

Note: This project uses Supabase for backend services, including authentication and database management. Supabase handles user registration, login, and data operations through its client libraries, so custom API endpoints like those below are not implemented or used in this app.

Authentication

Register User

Handled by Supabase Auth client library.

Login User

Handled by Supabase Auth client library.

Cart (Authenticated)

Cart management is done via Supabase database and client-side state management, not through custom API endpoints.


### Roadmap / Future Improvements

Payment gateway integration (Stripe)

Order history and tracking

Admin dashboard for product management

Product reviews and ratings

Email notifications


####  **Built by MrVyde**