# ReactJS Practice Cohort 9 - Assignment 4

## Overview
This repository contains four React.js mini-projects demonstrating various frontend development concepts and technologies. The projects are organized into two sets, each showcasing different aspects of modern React development.

---

## SET 1: Basic React Components & API Integration

### 1. Random Quote Generator
**Location:** `SET 1/RANDOM QUOTE GENERATOR ASSIGNMENT/Random Quote Generator/`

**Description:**
A simple React application that fetches and displays inspirational quotes from an external API. Users can navigate through quotes using Previous/Next buttons.

**Key Features:**
- Fetches quotes from DummyJSON API (`https://dummyjson.com/quotes`)
- State management using React hooks (`useState`, `useEffect`)
- Navigation between quotes with circular array logic
- Loading state handling
- Error handling for API failures

**Technical Implementation:**
- **Framework:** React 19.1.1 with Vite
- **State Management:** React Hooks (useState, useEffect)
- **API Integration:** Fetch API with error handling
- **Styling:** Custom CSS
- **Component Structure:** Single main component (`QuoteGenerator.jsx`)

**Learning Objectives:**
- Understanding React hooks and lifecycle
- API integration and data fetching
- State management in functional components
- Error handling in React applications

---

### 2. Weather Card
**Location:** `SET 1/WEATHER CARD/weather-card/`

**Description:**
A weather dashboard displaying current weather conditions for 10 major cities in Uganda. The application fetches real-time weather data and displays it using custom SVG icons.

**Key Features:**
- Real-time weather data for 10 Ugandan cities (Kampala, Entebbe, Jinja, etc.)
- Dynamic weather icon mapping based on conditions
- Temperature display with high/low ranges
- Responsive card-based layout
- Fallback data for failed API requests
- Loading and error states

**Technical Implementation:**
- **Framework:** React 19.1.1 with Vite
- **API Integration:** WeatherAPI.com integration
- **State Management:** React Hooks with async data fetching
- **UI Components:** Custom WeatherCard component
- **Assets:** 20+ custom SVG weather icons
- **Error Handling:** Graceful fallback for API failures

**Learning Objectives:**
- Working with external APIs and authentication
- Complex state management with async operations
- Component props and data mapping
- Asset management and dynamic imports
- Error handling and fallback strategies

---

## SET 2: Advanced React Applications

### 3. News Feed Application
**Location:** `SET 2/NEWS FEED ASSIGNMENT/newsfeed-frontend/news-frontend/`

**Description:**
A full-featured news application with both frontend and backend components. The frontend displays news posts from a Strapi CMS backend with advanced features like search, pagination, and single post views.

**Key Features:**
- **Frontend:**
  - Responsive news feed with card-based layout
  - Search functionality across titles, categories, and authors
  - Pagination for large datasets
  - Single post view with full content
  - Loading states and error handling
  - Modern UI with Mantine components

- **Backend (Strapi CMS):**
  - Headless CMS for content management
  - Post content types with relationships
  - Media upload and management
  - REST API endpoints
  - Authentication and authorization

**Technical Implementation:**
- **Frontend:**
  - React 19.1.1 with Vite
  - React Router DOM for navigation
  - Mantine UI component library
  - Axios for HTTP requests
  - Marked.js for markdown rendering
  - Responsive grid layout

- **Backend:**
  - Strapi CMS v4
  - RESTful API architecture
  - File upload handling
  - Database migrations
  - Admin panel configuration

**Learning Objectives:**
- Full-stack application development
- Content Management System integration
- Advanced React patterns (routing, state management)
- API design and consumption
- Modern UI component libraries
- Search and pagination implementation

---

### 4. Simple User Authentication
**Location:** `SET 2/SIMPLE USER AUTHENTICATION/USER AUTHENTICATION/`

**Description:**
A complete authentication system demonstrating user registration, login, and protected routes. The application includes both email/password authentication and OAuth integration with Google.

**Key Features:**
- **Authentication Methods:**
  - Email/password registration and login
  - Google OAuth integration
  - Session persistence with localStorage
  - Protected route implementation

- **User Interface:**
  - Login and signup pages
  - Dashboard for authenticated users
  - Form validation and error handling
  - Modern UI with Mantine components

- **Security Features:**
  - Mock authentication context
  - Route protection
  - Session management
  - Input validation

**Technical Implementation:**
- **Framework:** React 19.1.1 with Vite
- **Authentication:** Custom auth context with mock implementation
- **Routing:** React Router DOM with protected routes
- **UI Library:** Mantine components and forms
- **State Management:** React Context API
- **Form Handling:** Mantine form hooks with validation
- **Icons:** Tabler Icons React

**Learning Objectives:**
- Authentication and authorization patterns
- React Context API for global state
- Protected routes and navigation guards
- Form handling and validation
- OAuth integration concepts
- Security best practices in frontend applications

---

## Technical Stack Summary

### Core Technologies
- **React:** 19.1.1 (Latest version)
- **Build Tool:** Vite 7.1.7
- **Package Manager:** npm
- **Linting:** ESLint with React plugins

### Additional Libraries (Set 2)
- **UI Framework:** Mantine 8.3.3
- **Routing:** React Router DOM 7.9.3
- **HTTP Client:** Axios 1.12.2
- **Icons:** Tabler Icons React 3.35.0
- **Markdown:** Marked.js 16.3.0
- **Authentication:** Clerk React 5.50.0

### Development Tools
- **TypeScript Support:** Included in dev dependencies
- **Hot Reload:** Vite development server
- **Code Quality:** ESLint configuration
- **Build Optimization:** Vite production builds

---

## Project Structure Analysis

### SET 1 Projects
- **Complexity:** Beginner to Intermediate
- **Focus:** Core React concepts, API integration, component development
- **Dependencies:** Minimal external dependencies
- **Learning Curve:** Gentle introduction to React fundamentals

### SET 2 Projects
- **Complexity:** Intermediate to Advanced
- **Focus:** Full-stack development, authentication, modern UI patterns
- **Dependencies:** Rich ecosystem of modern libraries
- **Learning Curve:** Advanced React patterns and real-world application development

---

## Assessment Criteria

Each project demonstrates proficiency in:

1. **React Fundamentals:** Components, hooks, state management
2. **API Integration:** External data fetching and error handling
3. **Modern Development Practices:** ES6+, component composition, separation of concerns
4. **User Experience:** Loading states, error handling, responsive design
5. **Code Quality:** Clean code, proper file organization, documentation

The progression from SET 1 to SET 2 shows growth from basic React concepts to advanced full-stack application development, making this an excellent demonstration of React.js mastery.
# KCF-ASSIGNMENT-4
