Welcome! This is a technical challenge for QA Engineer candidates applying to Perch.

---

## 🎯 Objective

Your mission is to:

- Create as many **test cases** as possible for the different pages of this ecommerce application.
- Detect and clearly document **bugs, broken flows, or inconsistencies**.
- Suggest **functional or usability improvements** where relevant.

---

## 🧰 Technologies to Use

You are expected to complete this challenge using the following technologies:

- ✅ Cypress  
- ✅ Cucumber (Gherkin syntax)  
- ✅ TypeScript

---

## 🛒 Application Overview

This is an e-commerce web application where users can browse products, purchase them, and view their profile and order history. The application consists of the following key pages:

🔹 **Home Page** (`/`)  
- Displays a list of available products (name and price)  
- Each product links to its individual Product Page  
- Includes sorting functionality  

🔹 **Product Page** (`/product/:id`)  
- Shows details of a specific product: name, price, description  
- Allows selection of quantity  
- Button to add the product to the cart  

🔹 **Cart Page** (`/cart`)  
- Shows products added to the cart  
- Allows modifying quantity or removing items  
- Proceeds to checkout  

🔹 **Address Page** (`/checkout/address`)  
- Collects shipping and personal information  
- Fields for name, address, postal code, and phone number  

🔹 **Payment Page** (`/checkout/payment`)  
- Accepts credit card information  
- Validates card number, expiration date, and name  

🔹 **Success Page** (`/checkout/success`)  
- Confirmation screen after successful order placement  

🔹 **Profile Page** (`/profile`)  
- Displays user information  
- Shows order history with details for each purchase  

---

## 📋 Submission Instructions

1. **Fork this repository**
   - Create a **public** fork in your GitHub account.

2. **Work in a new branch**
   - Create a **new branch** for your changes with your name as branch name (e.g., `name-surname`).
   - Do **not** commit directly to `main`.

3. **Commit your work**
   - Add your test cases and documentation.
   - You may create a dedicated file (e.g., `ISSUES.md` or `FINDINGS.md`) to report anomalies or improvement suggestions.

4. **Create a Pull Request**
   - From your branch to your own `main` branch inside the **forked** repository.
   - This allows us to view the diff easily.
   - Set your name as PR name (e.g., `name-surname`).

5. **Notify us**
   - Send an email to our team confirming completion.
   - Include the **URL to your forked repository** and the **Pull Request**.

---

## ✅ Evaluation Criteria

We will evaluate your submission based on:

- Coverage and relevance of test cases
- Accuracy in identifying issues
- Communication of findings
- Code and folder organization

---

## 🛠️ Step-by-Step Guide

1. **Fork the repository**

   - Click the **“Fork”** button on the top right of the GitHub page to create a copy under your own account.
   - ✅ Yes — after forking, you still need to clone it locally to work on it.

2. **Clone your forked repository**

   Open your terminal and run:

   ```bash
   git clone https://github.com/<your-username>/qa-ecommerce-challenge.git
   ```


3. **Navigate to the project folder**

   ```bash
   cd qa-ecommerce-challenge
   ```

4. **Install project dependencies using Yarn**

   ```bash
   yarn
   ```

5. **Start the web application**

   ```bash
   yarn start
   ```

6. **Run the tests**
  
   To open Cypress in interactive mode:
   
   ```bash
   yarn cypress:open
    ```

   To open Cypress in headless mode:

    ```bash
   yarn cypress run
    ```
    
   OR
   
    ```bash
   yarn test
    ```
---
Good luck! If you have any questions, feel free to reach out before starting the challenge.
