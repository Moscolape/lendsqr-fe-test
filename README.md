# Lendsqr Frontend Engineering Assessment

This project is a frontend implementation of the Lendsqr Admin Console as part of the Frontend Engineering Assessment. The goal is to recreate selected pages from the provided Figma design with pixel-perfect accuracy, clean architecture, and best practices using React, TypeScript, and SCSS.


## 🔗 Live Demo

**👉 Deployed App:**  
https://chukwunenye-moses-lendsqr-fe-test.netlify.app/

**👉 Figma Design:**  
https://www.figma.com/design/ZKILoCoIoy1IESdBpq3GNC/Lendsqr-Frontend-Engineering-Assessment?node-id=5530-1427&t=KzVLw9Ps7hixDKIA-0


## 📌 Pages Implemented

- **Login Page**
- **Users Page**
- **User Details Page**
  - General Details (as per design)
  - Documents
  - Bank Details
  - Loans
  - Savings
  - App & System


## 🔐 Authentication (Mock Login)

Authentication is mocked to focus on UI, state management, and data flow.

- Login with the following credentials:
  - **Email:** lendsqr@fetest.com
  - **Password:** lendelian001
- No backend authentication is performed.
- Successful login redirects to the dashboard.


## 🧩 Data & Mock API

User data is generated using [faker-js](https://fakerjs.dev/) and served via [mockyapi.io](https://mockapi.io/).


### Mock API Features
- 500 user records
- Realistic user data matching the Figma design
- Includes:
  - Personal details
  - Education & employment
  - Socials
  - Bank information
  - Guarantor details
  - Tier rating


### Storage Strategy
- **Users list:** fetched from mock API
- **User details:** stored and retrieved using localStorage for fast access and persistence across refreshes


## 🛠️ Tech Stack

| Technology        | Usage                          |
|-------------------|--------------------------------|
| React             | UI & component architecture    |
| TypeScript        | Static typing & reliability    |
| SCSS              | Styling (as required)          |
| Vite              | Build tool                     |
| React Router      | Client-side routing            |
| Mocky.io          | Mock API hosting               |
| json-generator.com| Mock data generation           |


## 🎨 Styling & Design

- 100% pixel-perfect implementation of the Figma design
- SCSS used for:
  - Modular styles
  - Shared layout utilities
  - Component-level styling
- Fully responsive across desktop, tablet, and mobile breakpoints


## 🧪 Testing

Unit tests implemented for:
- Positive scenarios
- Negative/error states

Focus on:
- Component rendering
- Data handling
- Conditional UI states


## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Moscolape/lendsqr-fe-test.git
cd lendsqr-fe-test
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. App Will Be Available At
```bash
http://localhost:5173
```