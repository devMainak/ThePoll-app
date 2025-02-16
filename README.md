# Polling App Backend API Documentation

## Overview

This backend provides APIs for managing polls, allowing users to create polls, retrieve poll details, and vote on polls. The backend is built using Node.js, Express, and Mongoose.

## Base URL

```
https://the-poll-app.vercel.app/
```

## Poll Schema

The Poll model is structured as follows

```json
{
  "_id": "12345",
  "question": "What is your favorite programming language?",
  "options": [
    { "_id": "123", "choice": "JavaScript", "votes": 10 },
    { "_id": "124", "choice": "Python", "votes": 15 }
  ],
  "createdAt": "2025-02-16T12:00:00Z"
}
```

### Fiels:
_id (string) - Unique identifier for the poll.
question (string) - The poll question.
options (array) - List of voting options, each containing:
_id (string) - Unique identifier for the option.
choice (string) - The option text.
votes (number) - Number of votes for the option.
createdAt (date) - Timestamp when the poll was created.

## API Endpoints

### 1. Get Poll Details

**Endpoint:**

```
GET /polls
```

**Description:**
Fetch all the polls and their details

**Response:**

```json
{
  "message": "Polls fetched successfully",
  "polls": [
    {
      "_id": "67b1887c8c87fb17f2884c46",
      "question": "Preferred Backend Language?",
      "options": [
        {
          "choice": "NodeJS",
          "votes": 2,
          "_id": "67b1887c8c87fb17f2884c47"
        },
        {
          "choice": "Java",
          "votes": 0,
          "_id": "67b1887c8c87fb17f2884c48"
        },
        {
          "choice": "Python",
          "votes": 0,
          "_id": "67b1887c8c87fb17f2884c49"
        },
        {
          "choice": "Go",
          "votes": 1,
          "_id": "67b1887c8c87fb17f2884c4a"
        },
        {
          "choice": "Ruby",
          "votes": 1,
          "_id": "67b1887c8c87fb17f2884c4b"
        }
      ],
      "__v": 0
    }
  ]
}
```

### 2. Create a Poll

**Endpoint:**

```
POST /polls/create
```

**Description:**
Create a new poll with multiple voting options.

**Request Body:**

```json
{
  "question": "What is your favorite framework?",
  "options": [
    { "choice": "React" },
    { "choice": "Vue" },
    { "choice": "Angular" }
  ]
}
```

**Response:**

```json
{
  "_id": "12345",
  "question": "What is your favorite framework?",
  "options": [
    { "_id": "opt1", "text": "React", "votes": 0 },
    { "_id": "opt2", "text": "Vue", "votes": 0 },
    { "_id": "opt3", "text": "Angular", "votes": 0 }
  ],
  "createdAt": "2025-02-16T12:00:00Z"
}
```

### 3. Make a Vote

**Endpoint:**

```
POST /polls/:pollId
```

**Description:**
Cast a vote for a specific option in a poll.

**Request Parameters:**

- `pollId` (string, required) - The ID of the poll.

**Request Body:**

```json
{
  "optionIndex": "2"
}
```

**Response:**

```json
{
  "message": "Voted successfully!",
  "updatedPoll": {
    "_id": "67b1887c8c87fb17f2884c46",
    "question": "Preferred Backend Language?",
    "options": [
      {
        "choice": "NodeJS",
        "votes": 3,
        "_id": "67b1887c8c87fb17f2884c47"
      },
      {
        "choice": "Java",
        "votes": 0,
        "_id": "67b1887c8c87fb17f2884c48"
      },
      {
        "choice": "Python",
        "votes": 0,
        "_id": "67b1887c8c87fb17f2884c49"
      },
      {
        "choice": "Go",
        "votes": 1,
        "_id": "67b1887c8c87fb17f2884c4a"
      },
      {
        "choice": "Ruby",
        "votes": 1,
        "_id": "67b1887c8c87fb17f2884c4b"
      }
    ],
    "__v": 0
  }
}
```

## Error Responses

Common error responses for all endpoints:

- `400 Bad Request` - Missing or invalid input parameters.
- `404 Not Found` - Poll or option does not exist.
- `500 Internal Server Error` - Server encountered an error.

## Notes

- Ensure to replace `your-backend-url.com` with the actual backend URL.
- Future improvements may include authentication, rate limiting, and additional features like poll expiration.

---

**Author:** Your Name  
**Last Updated:** 2025-02-16
