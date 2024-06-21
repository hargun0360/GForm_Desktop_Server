# Slidely GForm Desktop API

## Overview

This project provides a RESTful API for managing form submissions. Users can submit forms, retrieve them, update existing entries, delete entries, and search for submissions by email.

## Features

- **Submit Form**: Allows users to submit a form with their details.
- **Retrieve Form**: Retrieve form submissions by index.
- **Update Form**: Update existing form submissions.
- **Delete Form**: Delete form submissions by index.
- **Search by Email**: Search for form submissions using the email.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine.
- **npm**:  package manager, typically comes with Node.js.

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the server**

   ```bash
   npm start
   ```

   The server will start and listen on port 3000. You should see the message: `Server is running on http://localhost:3000`.

### Project Structure

```plaintext
.
├── src
│   ├── index.ts
│   └── db.json (created automatically)
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Ping

- **Endpoint**: `/api/ping`
- **Method**: `GET`
- **Description**: Check if the server is running.
- **Response**:
  - **200 OK**
    ```json
    {
      "success": true
    }
    ```

### Submit Form

- **Endpoint**: `/api/submit`
- **Method**: `POST`
- **Description**: Submit a new form.
- **Request Body**:
  ```json
  {
    "Name": "John Doe",
    "Email": "john.doe@example.com",
    "Phone": "9876543210",
    "GithubLink": "https://github.com/johndoe",
    "StopwatchTime": "00:05:30"
  }
  ```
- **Response**:
  - **201 Created**
    ```json
    {
      "success": true
    }
    ```
  - **400 Bad Request** (Example)
    ```json
    {
      "error": "Invalid Data."
    }
    ```

### Read Form

- **Endpoint**: `/api/read`
- **Method**: `GET`
- **Description**: Retrieve a form submission by index.
- **Query Parameters**:
  - `index` (number): The index of the form submission.
- **Response**:
  - **200 OK**
    ```json
    {
      "Name": "John Doe",
      "Email": "john.doe@example.com",
      "Phone": "9876543210",
      "GithubLink": "https://github.com/johndoe",
      "StopwatchTime": "00:05:30"
    }
    ```
  - **400 Bad Request** (Example)
    ```json
    {
      "error": "Invalid index"
    }
    ```

### Update Form

- **Endpoint**: `/api/update`
- **Method**: `PUT`
- **Description**: Update an existing form submission.
- **Query Parameters**:
  - `index` (number): The index of the form submission to update.
- **Request Body**:
  ```json
  {
    "Name": "Jane Doe",
    "Email": "jane.doe@example.com",
    "Phone": "9876543211",
    "GithubLink": "https://github.com/janedoe",
    "StopwatchTime": "00:04:30"
  }
  ```
- **Response**:
  - **200 OK**
    ```json
    {
      "success": true
    }
    ```
  - **400 Bad Request** (Example)
    ```json
    {
      "error": "Invalid index"
    }
    ```

### Delete Form

- **Endpoint**: `/api/delete`
- **Method**: `DELETE`
- **Description**: Delete a form submission by index.
- **Query Parameters**:
  - `index` (number): The index of the form submission to delete.
- **Response**:
  - **200 OK**
    ```json
    {
      "success": true
    }
    ```
  - **400 Bad Request** (Example)
    ```json
    {
      "error": "Invalid index"
    }
    ```

### Search by Email

- **Endpoint**: `/api/search`
- **Method**: `GET`
- **Description**: Search for form submissions by email.
- **Query Parameters**:
  - `email` (string): The email to search for.
- **Response**:
  - **200 OK**
    ```json
    [
      {
        "Name": "John Doe",
        "Email": "john.doe@example.com",
        "Phone": "9876543210",
        "GithubLink": "https://github.com/johndoe",
        "StopwatchTime": "00:05:30"
      }
    ]
    ```
  - **400 Bad Request** (Example)
    ```json
    {
      "error": "Invalid email format"
    }
    ```

## Validation

The form submissions are validated on the server side. The following validations are performed:

1. **Name**: Must be greater than 3 characters.
2. **Email**: Must be a valid email address.
3. **Phone**: Must be a valid 10-digit Indian mobile number.
4. **GithubLink**: Must be a valid GitHub URL.
5. **All fields**: Must be filled out.

## Additional Features

### Edit Form

Allows updating of an existing form submission using the `/api/update` endpoint.

### Delete Form

Allows deletion of a form submission using the `/api/delete` endpoint.

### Search by Email

Allows searching for form submissions using the email with the `/api/search` endpoint.

---

