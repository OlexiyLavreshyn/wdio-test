# 🧪 SauceDemo UI Automation Project

## 📌 Project Overview

This project is an automated UI test framework built with:

* **WebdriverIO**
* **Mocha**
* **Allure Reporter**
* **Page Object Model (POM) architecture**

The framework supports:

* Parallel execution
* Multiple browsers (Chrome, Edge)
* Allure reporting
* Clean component-based Page Object structure


---

# ⚙️ Installation

## 1️⃣ Install dependencies

```bash
npm install
```

---

# 🚀 Running Tests

## Run all tests
```bash
npm test
```

---

# 📊 Allure Reporting

## Run tests

npm test

This generates results in:

```
/allure-results
```

---

## Generate Allure Report and open it

npm run allure:serve

## Only generate Allure Report

```bash
npm run allure:generate
```

## Only open Allure Report

```bash
allure serve allure-results
```