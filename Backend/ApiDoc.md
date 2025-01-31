# To-Do API Documentation

## Overview
This is a simple RESTful API built with Express.js to manage a to-do list. It allows users to create, retrieve, update, and delete to-do items. The data is stored in memory, meaning it will be lost when the server restarts.

## Base URL
```
http://localhost:3000/api/todos
```

## Endpoints

### 1. Get All To-Dos
**GET** `/api/todos`

**Response:**
- Status: `200 OK`
- Body:
  ```json
  [
    {
      "id": 1712345678901,
      "text": "Sample task",
      "completed": false
    }
  ]
  ```

### 2. Create a New To-Do
**POST** `/api/todos`

**Request Body:**
```json
{
  "text": "Buy groceries"
}
```

**Response:**
- Status: `201 Created`
- Body:
  ```json
  {
    "id": 1712345678902,
    "text": "Buy groceries",
    "completed": false
  }
  ```

### 3. Update a To-Do (Toggle Completion)
**PATCH** `/api/todos/:id`

**Request Parameters:**
- `id` (integer) - The unique identifier of the to-do item

**Request Body:**
```json
{
  "completed": true
}
```

**Response:**
- Status: `200 OK`
- Body:
  ```json
  {
    "id": 1712345678902,
    "text": "Buy groceries",
    "completed": true
  }
  ```

### 4. Delete a To-Do
**DELETE** `/api/todos/:id`

**Request Parameters:**
- `id` (integer) - The unique identifier of the to-do item

**Response:**
- Status: `204 No Content` (No body returned)

## Notes
- The API uses in-memory storage, so all data is lost when the server restarts.
- IDs are generated using `Date.now()`, which provides a unique timestamp.
- Ensure the request body contains valid JSON when making `POST` and `PATCH` requests.

## Running the Server
To start the server, run the following command:
```sh
node server.js
```
The server will be available at `http://localhost:3000`.

