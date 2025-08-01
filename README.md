# Playwright E2E Testing Project

This repository contains end-to-end tests built with `Playwright` and `TypeScript`. <br />
The tests are executed via both `Jenkins` pipeline and `GitHub Actions`

## 🚀 Overview

A comprehensive testing framework that

- Combines API, E2E, Visual testing in one solution
- Integrated with CI/CD pipelines and automated reporting systems.

### Sensitive Data Management
**⚠️ IMPORTANT: Sensitive variables should be stored in CI/CD environments, not in local .env files**

The following sensitive variables should be stored as secrets in your CI/CD environments (GitHub Actions/Jenkins) and NOT committed to version control:

#### Required Sensitive Variables
- `CUSTOMER_01_EMAIL` - First customer account email
- `CUSTOMER_01_PASSWORD` - First customer account password
- `CUSTOMER_02_EMAIL` - Second customer account email
- `CUSTOMER_02_PASSWORD` - Second customer account password
- `ADMIN_EMAIL` - Admin account email
- `ADMIN_PASSWORD` - Admin account password

**Note:** These are default test credentials provided by the website (practicesoftwaretesting.com) for automated testing purposes. They are not real user accounts and are publicly available, which is why they are stored in .env files for development convenience.

### Screenshots

<img width="842" alt="image" src="https://github.com/user-attachments/assets/2a1575fc-7ebb-42a0-8a2e-e353659b7619" />
<img width="1274" alt="image" src="https://github.com/user-attachments/assets/7f0551ac-71d0-475f-9e9e-9936d0d389e2" />
<img width="523" alt="image" src="https://github.com/user-attachments/assets/6127e465-1bab-4c19-80e3-8e602c53d0f9" />
<img width="571" alt="image" src="https://github.com/user-attachments/assets/e1bda9e3-e2bf-452c-8ed6-2823ff1844da" />
<img width="875" alt="image" src="https://github.com/user-attachments/assets/fbca39c8-a2ae-448e-b3b6-bd98c8229006" />
<img width="984" alt="image" src="https://github.com/user-attachments/assets/6ff35587-3902-48b7-bf3a-74a4f32d956e" />

## ✨ Features

1. All-in-one Testing Solution:

- 🌐 UI Testing: End-to-end user interface tests
- 🔌 API Testing: Backend API validation
- 👁️ Visual Testing: Screenshot comparison and visual regression

2. Robust CI/CD Integration

- 🔄 Jenkins Pipeline using reusable pipeline code from [Jenkins shared library](https://github.com/longautoqa/jenkins-shared-library)
- 🐙 GitHub Actions

3. Advanced Testing Capabilities:

- ⚙️ Dynamic test parameterization (environments, test types, workers...)
- 📆 Scheduled test runs (daily regression tests)
- 🔍 Automated PR validation jobs, eg: `Eslint`, `Synk`
- 🔔 Slack notifications for trigger test / test results
- 📍 Run smoke test whenever a PR is merged to web-app

4. 🔌 Integrate between Github & Slack

- Notify channel when a PR is created / merged / closed

5. 📊 Test reports

- Test reports are automatically generated
- Download generated test reports
- View summary test reports (passed, failed, flaky tests)
- View test report details via `Jenkins`, `Github Actions`

## 🛠️ Tools & Technologies

- [Playwright](https://playwright.dev/) - Modern web testing framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript programming language
- [GitHub Actions](https://github.com/features/actions) - Cloud-based CI/CD platform
- [Jenkins](https://www.jenkins.io/) - Self-hosted automation server
- [Ngrok](https://ngrok.com/) - Secure tunneling for local Jenkins exposure
- [ESLint](https://eslint.org/) - JavaScript linting utility
- [Prettier](https://prettier.io/) - Code formatting tool
- [Makefile](https://www.gnu.org/software/make/manual/make.html) - Task automation and build configuration

## 🧰 Prerequisites

- Node.js (version 20 or higher)

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/longautoqa/e2e-automation-playwright.git
```

2. Navigate to project directory:

```bash
cd e2e-automation-playwright
```

3. Install dependencies:

```bash
npm ci
```

## Local Development

Maintain code quality with pre-commit checks

```bash
npm run format
```

## ⚡ How to run E2E tests

By default, tests will run in staging (QA) environment

### Environment support

- Development
- Staging (QA)
- Production (Release)

### Basic command

```bash
TEST_ENV={env} TEST_TYPE=${project_type} WORKERS={number} make test
```

### Execute tests

#### API Tests

```bash
TEST_ENV=${env} WORKERS=4 make api-test
```

#### UI Tests

```bash
TEST_ENV=${env} WORKERS=4 make e2e-test
```

#### Visual Tests

```bash
TEST_ENV=${env} WORKERS=4 make visual-test
```

#### Regression Tests

```bash
TEST_ENV=${env} WORKERS=10 make regression-test
```

#### Count Tests

To count how many `test specs` & `tests` in your project

```bash
make count-tests
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⭐ Support

If you find this project useful, please consider giving it a star on GitHub!
