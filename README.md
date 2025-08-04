# 🧪 E-commerce QA Automation Project

This repository contains a comprehensive test automation solution for an e-commerce application, developed as part of Perch's QA Technical Challenge.

---

## 📋 Quick Links

- **📄 [Challenge Instructions](./CHALLENGE_INSTRUCTIONS.md)** - Original challenge requirements and setup guide
- **🐛 [Bug Findings](./findings.md)** - Comprehensive list of identified issues and improvements

---

## 🎯 Project Overview

### Challenge Objective
Create comprehensive test cases for an e-commerce application using Cypress and Cucumber, focusing on:
- **Functional testing** across all user flows
- **Bug detection** and documentation
- **Test automation** with maintainable code structure

### Application Under Test
A React-based e-commerce platform with the following pages:
- **Home Page** - Product catalog with sorting functionality
- **Product Page** - Individual product details and cart functionality
- **Cart Page** - Shopping cart management
- **Checkout Flow** - Address → Payment → Success pages
- **Profile Page** - User information and order history

---

## 🛠️ Tech Stack

- **🌐 Cypress** - End-to-end testing framework
- **🥒 Cucumber** - Behavior-driven development with Gherkin syntax
- **📝 JavaScript** - Test automation language
- **🎯 Page Object Model** - Test architecture pattern

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:vitorlucenam/perch-qa-technical-challenge-vitormoura.git
   cd perch-qa-technical-challenge-vitormoura
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the application**
   ```bash
   npm start
   # or
   yarn start
   ```
   The application will be available at `http://localhost:3000`

### Running Tests

**Interactive Mode (Cypress UI)**
```bash
npm run cypress:open
# or
yarn cypress:open
```

**Headless Mode**
```bash
npm test
# or
npm run cypress:run
```

---

## 📁 Project Structure

```
cypress/
├── fixtures/           # Test data files
├── integration/        # Feature files and step definitions
│   ├── *.feature      # Gherkin scenarios
│   └── step_definitions/ # Cucumber step implementations
├── pages/             # Page Object Models
├── plugins/           # Cypress plugins configuration
└── support/           # Custom commands and utilities

src/                   # React application source code
├── pages/            # Application pages
└── data/             # Product data
```

---

## 🧪 Test Coverage

### Implemented Test Suites

**🏠 Homepage Testing**
- Product catalog display and functionality
- Sorting mechanisms (price ascending/descending)
- Product navigation and links
- UI element validation

**📦 Product Page Testing**  
- Product information display
- Quantity selection functionality
- Add to cart operations
- Navigation flows

**🛒 Cart Management**
- Item addition and removal
- Quantity modifications
- Subtotal calculations
- Empty cart scenarios
- Checkout navigation

**💳 Checkout Flow**
- **Address Form**: Field validation, data persistence, navigation
- **Payment Form**: Card validation, form submission, error handling
- **Success Page**: Order confirmation, navigation options

**🔄 End-to-End Scenarios**
- Complete purchase flows
- Multi-item cart scenarios
- User journey validation

### Test Architecture Features

- **🎭 Page Object Model** - Maintainable and reusable page interactions
- **🥒 BDD with Cucumber** - Human-readable test scenarios
- **🔧 Custom Commands** - Cart management and utility functions
- **📊 Test Data Management** - Fixture files for consistent testing
- **🏗️ Modular Design** - Organized step definitions and helpers

---

## 📊 Key Testing Highlights

### Comprehensive Coverage
- **50+ test scenarios** covering critical user paths
- **Cross-browser compatibility** testing
- **Responsive design** validation
- **Error handling** and edge cases

### Advanced Test Patterns
- **Data-driven testing** using Cucumber tables
- **Dynamic element handling** for cart operations
- **State management** testing with localStorage
- **Form validation** across multiple pages

### Quality Assurance Focus
- **Bug identification** and documentation
- **Usability testing** insights
- **Performance considerations**
- **Accessibility testing** elements

---

## 🐛 Issues & Findings

This project has identified several bugs and improvement opportunities in the application. For detailed information about each issue, including:
- Bug descriptions and severity levels
- Steps to reproduce
- Expected vs actual behavior
- Improvement suggestions

**📋 View the complete findings: [findings.md](./findings.md)**

---

## 📈 Project Outcomes

### Achievements
- ✅ **Comprehensive test automation** framework
- ✅ **Multiple critical bugs** identified and documented  
- ✅ **Maintainable test architecture** with Page Object Model
- ✅ **Clear documentation** and reporting
- ✅ **Production-ready** test suite

### Key Metrics
- **6 feature files** with comprehensive scenarios
- **15+ page object methods** for reliable interactions
- **100% critical path coverage** for e-commerce flows
- **Multiple bug categories** identified (UI, functional, usability)

---

## 🔧 Configuration

The project includes optimized Cypress configuration for:
- **Browser settings** and viewport management
- **Test execution** parameters
- **Cucumber preprocessing** setup
- **Video and screenshot** capture

---

## 👨‍💻 Development Notes

This test automation project demonstrates:
- **Industry best practices** in test automation
- **Scalable architecture** for growing test suites  
- **Clear separation of concerns** between page objects and tests
- **Comprehensive documentation** for team collaboration
- **Bug-focused QA approach** with actionable insights

---

*For the original challenge instructions and setup details, see [CHALLENGE_INSTRUCTIONS.md](./CHALLENGE_INSTRUCTIONS.md)*
