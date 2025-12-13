# 🍬 Sweet Shop Management System

**A simple, secure way to manage your confectionery inventory.**

[**🚀 Explore the App Live**](https://incubyte-assesment-mu.vercel.app)

---

## 👋 About The Project

Welcome to the Sweet Shop Management System! I built this application to solve a common problem for small shop owners: keeping track of delicious inventory without the headache of spreadsheets.

Whether you're selling Gulab Jamuns by the piece or Jalebis by the gram, this tool gives you a private, secure dashboard to manage everything in one place. It's designed to be clean, fast, and easy to use.

---

## ✨ What You Can Do

*   **🔒 Your Own Private Space:** Complete privacy. When you create an account, you get your own isolated dashboard. No one else can see your inventory, and you can't see anyone else's.
*   **⚖️ Flexible Units:** Not everything is sold the same way. You can track items by **Piece** (like lollipops) or by **Gram** (like loose candies).
*   **💰 Smart Calculations:** As you update your stock, the system automatically handles the math, showing you the total value of your inventory instantly.
*   **🛡️ Built-in Safety:** The system gently prevents mistakes, like accidentally setting a negative price or quantity, keeping your data clean and accurate.

---

## 🛠️ How It's Built

I chose a modern technology stack to ensure the application is fast, reliable, and secure.

### **Frontend (The Interface)**
*   ⚛️ **React + Vite:** Makes the app feel snappy and responsive.
*   🎨 **Tailwind CSS:** Provides a clean and modern look.
*   🧩 **Shadcn UI:** Ensures buttons and inputs feel polished and accessible.

### **Backend (The Engine)**
*   🚂 **Node.js & Express:** Handles all the logic behind the scenes.
*   🗃️ **Prisma ORM:** Helps talk to the database safely and efficiently.
*   🐘 **PostgreSQL:** A robust database to store your data securely (hosted on Neon).

---

## 🚀 Quick Start Guide

Want to run this on your own machine? Here is how you can get started.

### 1. Set Up the Backend
```bash
cd sweet-shop-backend
npm install

# Connect your database and set up security
# Create a .env file with DATABASE_URL and JWT_SECRET

npx prisma migrate dev  # Set up the database
npm run dev             # Start the server
```

### 2. Set Up the Frontend
```bash
cd sweet-shop-frontend
npm install

# Point the app to your local backend
# Create a .env file with VITE_API_URL="http://localhost:3000"

npm run dev             # Launch the app!
```

---

## API Overview

Here are the main ways the app talks to the server:

| Action | What it does |
| :--- | :--- |
| **Register** | Creates a new secure account for you. |
| **Login** | Verifies who you are and opens your dashboard. |
| **Get Sweets** | Fetches *only* your personal inventory list. |
| **Add Sweet** | Saves a new item to your collection. |
| **Update/Delete** | Changes or removes an item (after checking it belongs to you). |

---

## My AI Usage

I used a few AI tools during development to accelerate certain tasks while keeping full control over design and implementation. Below is a transparent summary of what I used AI for and what I did not.

### AI Tools Used

• ChatGPT
• GitHub Copilot (limited usage)

### How I Used AI

• Used ChatGPT to:
  • Clarify backend architectural decisions
  • Review REST API design
  • Debug errors and understand test failures
  • Improve commit message clarity

• Used GitHub Copilot occasionally for:
  • Boilerplate suggestions (e.g., controller or route skeletons)

### What I Did NOT Use AI For

• I did not auto-generate the full project
• I did not copy-paste complete solutions blindly
• I did not rely on AI for business logic decisions

### Reflection

AI acted as a supporting tool, similar to documentation or StackOverflow. All design decisions, implementation steps, debugging, and test-driven development flow were done and validated by me.

Using AI helped me:
  • Move faster without compromising understanding
  • Catch mistakes earlier
  • Maintain clean, readable code

I can confidently explain every line of code in this project.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/dprateek996">Prateek Dwivedi</a>
</p>
