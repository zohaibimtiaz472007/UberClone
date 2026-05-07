# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, it returns the user's details along with an authentication token.

### Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "fullname": {
    "firstName": "string (min: 3, max: 100, required)",
    "lastname": "string (min: 3, max: 100, required)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

### Response
#### Success Response
- **Status Code:** `201 Created`
- **Body:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "string",
    "email": "string",
    "fullname": {
      "firstName": "string",
      "lastname": "string"
    }
  },
  "token": "string"
}
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Validation errors in the input data.
  - **Body:**

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Unexpected server error.
  - **Body:**

```json
{
  "message": "An error occurred"
}
```

### Notes
- Ensure that the `email` field is unique.
- Passwords are hashed before being stored in the database.
- The authentication token expires in 1 hour.

## Endpoint: `/users/login`

### Description
This endpoint is used to authenticate a user. It validates the input data, checks the user's credentials, and returns an authentication token upon successful login.

### Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (required)"
}
```

### Response
##### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "Login successful",
  "user": {
    "id": "string",
    "email": "string",
    "fullname": {
      "firstName": "string",
      "lastname": "string"
    }
  },
  "token": "string"
}
```

##### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Validation errors in the input data.
  - **Body:**

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

- **Status Code:** `401 Unauthorized`
  - **Reason:** Invalid email or password.
  - **Body:**

```json
{
  "message": "Invalid email or password"
}
```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Unexpected server error.
  - **Body:**

```json
{
  "message": "An error occurred"
}
```

### Notes
- Ensure the `email` exists in the database.
- Passwords are compared securely using bcrypt.
- The authentication token expires in 1 hour.