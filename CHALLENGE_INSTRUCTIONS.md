# 🧪 QA Engineer – Technical Challenge (48h)

Welcome! This is a technical challenge for QA Engineer candidates applying to **Perch**.

---

## 🎯 Objective

Your mission is to:

- Create as many **test cases** as possible for the different pages of this e-commerce application.
- Detect and clearly document **bugs, broken flows, or inconsistencies**.
- Suggest **functional or usability improvements** where relevant.

---

## 🧰 Technologies to Use

You are expected to complete this challenge using the following technologies:

- ✅ Cypress  
- ✅ Cucumber (Gherkin syntax)  
- ✅ JavaScript

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

1. **Availability confirmation:**  
   - Share the day you are available to start the 48-hour challenge.

2. **Challenge start:**  
   - On the agreed day, we will share with you the URL of the GitHub repository that contains the base project.

3. **DO NOT FORK this repository**  
   - Instead, **clone it** to your local machine:

     ```bash
     git clone https://github.com/estefaniaMiceliQA/perch-qa-technical-challenge
     ```

4. **Create a new public repository in your own GitHub account**  
   - Name it something like `perch-qa-technical-challenge-yourname`.  
   - Push the cloned project and your changes there.

5. **Work in a new branch**  
   - Create a **new branch** with your name (e.g., `name-surname`).  
   - Do **not** commit directly to `main`.

6. **Commit your work**  
   - Add your test cases and all documentation.  
   - **You must include a `findings.md` file (in Markdown format) in the repository** to document any detected issues, bugs, or improvement suggestions.  
   - ⚠️ **Do not send issues or improvements in a separate document. Only `findings.md` inside the repo will be accepted.**

7. **DO NOT OPEN a Pull Request into THIS repository**  
   - Keep all changes in your own public repository.  
   - Do **not** open a Pull Request to this repository.

8. **Notify us**  
   - Send an email to our team confirming completion.  
   - Include the **URL to your public repository** and the **branch name**.

---

## ✅ Evaluation Criteria

We will evaluate your submission based on:

- Coverage and relevance of test cases
- Accuracy in identifying issues
- Quality and clarity of `findings.md`
- Code and folder organization

---

## 🛠️ Step-by-Step Guide

1. **Clone the base repository**

   ```bash
   git clone https://github.com/estefaniaMiceliQA/perch-qa-technical-challenge
   ```

2. **Create your own public repository**
   
   - On GitHub, create a new public repository under your account.

3. **Push the project to your new repository**

   ```bash
   git remote remove origin
   git remote add origin https://github.com/<your-username>/qa-ecommerce-challenge-yourname.git
   git checkout -b name-surname
   git push -u origin name-surname
   ```

4. **Install project dependencies**
   
   ```bash
   yarn
   ```

5. **Start the web application**
 
   ```bash
   yarn start
   ```
   
6. **Run the tests**
   
   - Interactive mode:
 
      ```bash
      yarn cypress:open
      ```

   - Headless mode:

      ```bash
      yarn cypress run
      # or
      yarn test
      ```
   
---

Good luck! If you have any questions, feel free to reach out before starting the challenge.
