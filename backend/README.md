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

## Endpoint: `/users/profile`

### Description
This endpoint is used to retrieve the profile of the authenticated user. It requires the user to be logged in and provides the user's details.

### Method
`GET`

### Headers
- **Authorization:** `Bearer <token>` (required if token is not in cookies)

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "_id": "string",
  "fullname": {
    "firstName": "string",
    "lastname": "string"
  },
  "email": "string",
  "socketId": "string"
}
```

#### Error Responses
- **Status Code:** `401 Unauthorized`
  - **Reason:** Missing or invalid token.
  - **Body:**

```json
{
  "message": "Invalid token."
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
- The token can be provided in the `Authorization` header or as a cookie.
- Ensure the token is valid and not blacklisted.

---

## Endpoint: `/users/logout`

### Description
This endpoint is used to log out the authenticated user. It clears the authentication token from cookies and blacklists the token to prevent further use.

### Method
`GET`

### Headers
- **Authorization:** `Bearer <token>` (required if token is not in cookies)

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "Logout successful"
}
```

#### Error Responses
- **Status Code:** `401 Unauthorized`
  - **Reason:** Missing or invalid token.
  - **Body:**

```json
{
  "message": "Invalid token."
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
- The token is blacklisted to prevent reuse.
- The token can be provided in the `Authorization` header or as a cookie.

## Endpoint: `/captains/register`

### Description
This endpoint is used to register a new captain. It validates the input data, hashes the password, and creates a new captain in the database. Upon successful registration, it returns the captain's details along with an authentication token.

### Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "fullname": {
    "firstname": "string (min: 3, required)",
    "lastname": "string (min: 3, required)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)",
  "vehicle": {
    "color": "string (min: 3, required)",
    "plate": "string (min: 3, required)",
    "capacity": "number (min: 1, required)",
    "vehicleType": "string (one of: car, bike, auto, required)"
  }
}
```

### Response
#### Success Response
- **Status Code:** `201 Created`
- **Body:**

```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "status": "string",
    "location": {
      "lat": "number",
      "lng": "number"
    }
  },
  "token": "string"
}
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Validation errors in the input data or captain already exists.
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
- The authentication token expires in 24 hours.

---

## Endpoint: `/captains/login`

### Description
This endpoint is used to authenticate a captain. It validates the input data, checks the captain's credentials, and returns an authentication token upon successful login.

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
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "status": "string",
    "location": {
      "lat": "number",
      "lng": "number"
    }
  },
  "token": "string"
}
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Validation errors in the input data or invalid credentials.
  - **Body:**

```json
{
  "error": "Invalid email or password"
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
- The authentication token expires in 24 hours.

---

## Endpoint: `/captains/profile`

### Description
This endpoint is used to retrieve the profile of the authenticated captain. It requires the captain to be logged in and provides the captain's details.

### Method
`GET`

### Headers
- **Authorization:** `Bearer <token>` (required if token is not in cookies)

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "status": "string",
    "location": {
      "lat": "number",
      "lng": "number"
    }
  }
}
```

#### Error Responses
- **Status Code:** `401 Unauthorized`
  - **Reason:** Missing or invalid token.
  - **Body:**

```json
{
  "message": "Invalid token."
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
- The token can be provided in the `Authorization` header or as a cookie.
- Ensure the token is valid and not blacklisted.

---

## Endpoint: `/captains/logout`

### Description
This endpoint is used to log out the authenticated captain. It clears the authentication token from cookies and blacklists the token to prevent further use.

### Method
`GET`

### Headers
- **Authorization:** `Bearer <token>` (required if token is not in cookies)

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "Logged out successfully"
}
```

#### Error Responses
- **Status Code:** `401 Unauthorized`
  - **Reason:** Missing or invalid token.
  - **Body:**

```json
{
  "message": "Invalid token."
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
- The token is blacklisted to prevent reuse.
- The token can be provided in the `Authorization` header or as a cookie.

---

## Endpoint: `/maps/search`

### Description
This endpoint is used to search for a location based on user input. It returns the most relevant location details.

### Method
`GET`

### Query Parameters
- `input`: `string` (required) - The search query for the location.

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
[
  {
    "place_id": "string",
    "display_name": "string",
    "lat": "string",
    "lon": "string"
  }
]
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Missing input query parameter.
  - **Body:**

```json
{
  "message": "Input is required"
}
```

---

## Endpoint: `/maps/distance-time`

### Description
This endpoint calculates the distance and estimated travel time between two locations.

### Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "origin": "string (required)",
  "destination": "string (required)"
}
```

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "origin": "string",
  "destination": "string",
  "distanceInKm": "number",
  "durationInMinutes": "number"
}
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Missing origin or destination.
  - **Body:**

```json
{
  "message": "Origin and destination required"
}
```

---

## Endpoint: `/maps/suggestions`

### Description
This endpoint provides location suggestions based on a query, focusing on Pakistan and the Khyber Pakhtunkhwa region.

### Method
`GET`

### Query Parameters
- `query`: `string` (required) - The search query for location suggestions.

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
[
  {
    "name": "string",
    "lat": "string",
    "lng": "string"
  }
]
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Missing query parameter.
  - **Body:**

```json
{
  "message": "Query is required"
}
```

---

## Endpoint: `/maps/route`

### Description
This endpoint retrieves the route details between two locations.

### Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "origin": {
    "lat": "number",
    "lng": "number"
  },
  "destination": {
    "lat": "number",
    "lng": "number"
  }
}
```

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            "number",
            "number"
          ]
        ]
      }
    }
  ]
}
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Missing or invalid origin/destination.
  - **Body:**

```json
{
  "message": "Invalid origin or destination"
}
```

---

## Endpoint: `/rides/create`

### Description
This endpoint is used to create a new ride. It calculates the fare based on the origin and destination, and stores the ride details in the database.

### Method
`POST`

### Headers
- **Authorization:** `Bearer <token>` (required)

### Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "origin": "string (required)",
  "destination": "string (required)"
}
```

### Response
#### Success Response
- **Status Code:** `201 Created`
- **Body:**

```json
{
  "success": true,
  "message": "Ride created successfully",
  "data": {
    "_id": "string",
    "user": "string",
    "origin": "string",
    "destination": "string",
    "fare": "number",
    "status": "string",
    "distance": "number",
    "duration": "number"
  }
}
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Missing required fields.
  - **Body:**

```json
{
  "success": false,
  "message": "Origin and destination required"
}
```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Unexpected server error.
  - **Body:**

```json
{
  "success": false,
  "message": "An error occurred"
}
```

---

## Endpoint: `/rides/fare`

### Description
This endpoint calculates the fare for a ride based on the origin and destination.

### Method
`GET`

### Query Parameters
- **origin**: `string (required)`
- **destination**: `string (required)`

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "success": true,
  "data": {
    "fare": "number",
    "distance": "number",
    "duration": "number"
  }
}
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Missing required query parameters.
  - **Body:**

```json
{
  "success": false,
  "message": "Origin and destination required"
}
```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Unexpected server error.
  - **Body:**

```json
{
  "success": false,
  "message": "An error occurred"
}
```

---

## Endpoint: `/rides/:rideId`

### Description
This endpoint retrieves the details of a specific ride by its ID.

### Method
`GET`

### Headers
- **Authorization:** `Bearer <token>` (required)

### Path Parameters
- **rideId**: `string (required)`

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "success": true,
  "data": {
    "_id": "string",
    "user": "string",
    "captain": "string",
    "origin": "string",
    "destination": "string",
    "fare": "number",
    "status": "string",
    "distance": "number",
    "duration": "number"
  }
}
```

#### Error Responses
- **Status Code:** `404 Not Found`
  - **Reason:** Ride not found.
  - **Body:**

```json
{
  "success": false,
  "message": "Ride not found"
}
```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Unexpected server error.
  - **Body:**

```json
{
  "success": false,
  "message": "An error occurred"
}
```

---

## Endpoint: `/rides/:rideId/status`

### Description
This endpoint updates the status of a specific ride.

### Method
`PUT`

### Headers
- **Authorization:** `Bearer <token>` (required)

### Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "rideId": "string (required)",
  "status": "string (required, one of: pending, accepted, ongoing, completed, cancelled)"
}
```

### Response
#### Success Response
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "success": true,
  "message": "Ride status updated",
  "data": {
    "_id": "string",
    "status": "string"
  }
}
```

#### Error Responses
- **Status Code:** `400 Bad Request`
  - **Reason:** Invalid status or missing fields.
  - **Body:**

```json
{
  "success": false,
  "message": "Ride ID and status required"
}
```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Unexpected server error.
  - **Body:**

```json
{
  "success": false,
  "message": "An error occurred"
}
```