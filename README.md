Markdown
# 🎯 CareerForge

**CareerForge** is an intelligent web application designed to help students optimize their job search. It serves as a smart resume analyzer and job application tracker, allowing users to evaluate their resumes against job descriptions, manage their application statuses, and keep their career preparation organized in one unified portal.

---

## 🚀 Features

* **Smart Resume Analyzer**: Upload and evaluate your resume to see how well it aligns with specific job descriptions.
* **Job Application Tracker**: Keep tabs on all the jobs you have applied to, including application status, deadlines, and follow-ups.
* **Student Dashboard**: A clean, centralized interface designed specifically to streamline the student job-hunting workflow.
* **Robust Backend API**: Powered by a secure and scalable Spring Boot architecture.

---

## 🛠️ Tech Stack

### Frontend
* **HTML5, CSS3, & JavaScript (ES6+)** — Clean, responsive, and interactive user interface.

### Backend
* **Java (Spring Boot)** — High-performance RESTful API endpoints.
* **Maven** — Dependency management and build automation.

---

## 📂 Project Structure

```text
CareerForge/
├── BACKEND/             # Java Spring Boot Backend
│   └── demo/
│       ├── src/         # Java source files (Controllers, Models, Application)
│       ├── pom.xml      # Maven dependencies
│       └── ...
├── FRONTEND/            # Web Frontend
│   ├── index.html       # Landing Page & Dashboard UI
│   ├── styles.css       # Custom styling
│   └── app.js           # Client-side routing and API consumption
└── README.md
⚙️ How to Setup and Run Locally
Prerequisites
Java JDK (v17 or higher recommended)

Apache Maven installed

A modern web browser

Running the Backend (Spring Boot)
Navigate to the backend directory:

Bash
cd BACKEND/demo
Build and run the Spring Boot application using Maven:

Bash
./mvnw spring-boot:run
(On Windows PowerShell, use ./mvnw.cmd spring-boot:run)

The backend API will start running locally (usually on http://localhost:8080).

Running the Frontend
Navigate to the frontend directory:

Bash
cd ../../FRONTEND
Open index.html directly in your browser, or serve it using a VS Code extension like Live Server to prevent CORS issues when communicating with the backend API.
