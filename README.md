# Lottery System API

This project is a simple lottery system providing REST APIs to manage tickets. Each ticket consists of lines, and each line can have a specific result based on predefined rules.

## Features

- **Create a ticket** with a specified number of lines.
- **Amend** an existing ticket by adding new lines (if not already checked).
- **Retrieve ticket status** to see results of each line.
- **List and view tickets** by ID.

## Requirements

- **Node.js** (v14+)
- **npm**

## Setup Instructions

### Clone the Repository

```bash
git clone <repository-url>
cd lottery-system
```

### Install Dependencies
```bash
npm install
```

### Run the command to create a .env file (optional)
cp .env.example .env

### Run the Application
```bash
npm run start
```
### The server will start on http://localhost:3000 by default.

### Run the Application

### You can access the swagger for the api docs at 
http://localhost:3000/api-docs/

### Run the Unit-Test-Cases
```bash
npm run test
```