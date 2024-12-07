
# NodeJs: Build The Complete E-Commerce Web API


# Introduction
 Build The Complete E-Commerce Web API




# Run

### Install

```
npm install
```

### Start API

```
npm start
```

# Routes

### Products

```
GET      /api/v1/products
GET      /api/v1/products/:id
POST     /api/v1/products
PUT      /api/v1/products/:id
DELETE   /api/v1/products/:id
PUT gallery-images : /api/v1/products/gallery-images/:id
GET featured products: /api/v1/products/get/featured/:count
GET products count: /api/v1/products/get/count
```




## User login/register API Routes Documentation

This document provides a detailed description of the API endpoints for the backend, along with the required data, request methods, and the response structure. These APIs are designed to handle user registration, login, and basic user CRUD operations.

### 1. **Get All Users**

#### **Endpoint**: `/api/users/`

- **Method**: `GET`
- **Description**: Fetches all users from the database (excluding the password field).
- **Response**:
  ```json
  [
    {
      "id": "605c72ef153207001f1e0a1",
      "name": "Normal User",
      "email": "user@example.com",
      "phone": "1234567890",
      "isAdmin": false
    },
    {
      "id": "605c72ef153207001f1e0a2",
      "name": "Admin User",
      "email": "admin@example.com",
      "phone": "0987654321",
      "isAdmin": true
    }
  ]
  ```

### 2. **Get Single User by ID**

#### **Endpoint**: `/api/users/:id`

- **Method**: `GET`
- **Description**: Fetches a single user by their ID from the database (excluding the password field).
- **Parameters**:
  - `id` (URL Parameter): The unique ID of the user.
- **Response**:
  ```json
  {
    "id": "605c72ef153207001f1e0a1",
    "name": "Normal User",
    "email": "user@example.com",
    "phone": "1234567890",
    "isAdmin": false
  }
  ```

### 3. **Register a New User**

#### **Endpoint**: `/api/users/register`

- **Method**: `POST`
- **Description**: Registers a new user and saves them to the database.
- **Required Data** (in the request body):
  - `name`: The user's full name.
  - `email`: The user's email address (must be unique).
  - `password`: The user's password.
  - `phone`: The user's phone number.
  - `isAdmin`: Boolean value indicating whether the user is an admin.
  - `street`: The user's street address.
  - `apartment`: The user's apartment address.
  - `zip`: The user's postal zip code.
  - `city`: The user's city.
  - `country`: The user's country.
- **Response** (on success):
  ```json
  {
    "id": "605c72ef153207001f1e0a3",
    "name": "New User",
    "email": "newuser@example.com",
    "phone": "1231231234",
    "isAdmin": false
  }
  ```
- **Response** (on failure):
  - `400 Bad Request`: "The user cannot be created!"

### 4. **Login a User**

#### **Endpoint**: `/api/users/login`

- **Method**: `POST`
- **Description**: Authenticates the user and returns the user details with a message indicating whether the login was successful.
- **Required Data** (in the request body):
  - `email`: The email address of the user.
  - `password`: The password of the user.
- **Response** (on success):
  ```json
  {
    "message": "User login successful",
    "user": {
      "id": "605c72ef153207001f1e0a1",
      "name": "Normal User",
      "email": "user@example.com",
      "phone": "1234567890",
      "isAdmin": false
    }
  }
  ```
  Or, for admins:
  ```json
  {
    "message": "Admin login successful",
    "user": {
      "id": "605c72ef153207001f1e0a2",
      "name": "Admin User",
      "email": "admin@example.com",
      "phone": "0987654321",
      "isAdmin": true
    }
  }
  ```
- **Response** (on failure):
  - `400 Bad Request`: "The user not found" (if email is incorrect).
  - `400 Bad Request`: "Password is incorrect!" (if the password does not match).

### 5. **Update User Information**

#### **Endpoint**: `/api/users/:id`

- **Method**: `PUT`
- **Description**: Updates the user's information. If a password is provided, it will be hashed and updated.
- **Parameters**:
  - `id` (URL Parameter): The unique ID of the user.
- **Required Data** (in the request body):
  - `name`: Updated full name.
  - `email`: Updated email address.
  - `password`: Updated password (optional).
  - `phone`: Updated phone number.
  - `isAdmin`: Updated admin status.
  - `street`: Updated street address.
  - `apartment`: Updated apartment address.
  - `zip`: Updated postal zip code.
  - `city`: Updated city.
  - `country`: Updated country.
- **Response** (on success):
  ```json
  {
    "id": "605c72ef153207001f1e0a1",
    "name": "Updated User",
    "email": "updateduser@example.com",
    "phone": "1234567890",
    "isAdmin": false
  }
  ```
- **Response** (on failure):
  - `400 Bad Request`: "The user cannot be updated!"

### 6. **Delete a User**

#### **Endpoint**: `/api/users/:id`

- **Method**: `DELETE`
- **Description**: Deletes a user from the database.
- **Parameters**:
  - `id` (URL Parameter): The unique ID of the user.
- **Response** (on success):
  ```json
  {
    "success": true,
    "message": "The user is deleted!"
  }
  ```
- **Response** (on failure):
  - `404 Not Found`: "User not found!"
  - `500 Internal Server Error`: "Error message"

### 7. **Get User Count**

#### **Endpoint**: `/api/users/get/count`

- **Method**: `GET`
- **Description**: Retrieves the total count of users in the database.
- **Response**:
  ```json
  {
    "userCount": 100
  }
  ```
  Where `100` is the total number of users in the database.

---

### Error Handling

- If any of the required fields are missing or invalid, the API will respond with an appropriate error code (`400 Bad Request`).
- If the requested user does not exist, a `404 Not Found` error will be returned.
- Server errors will return a `500 Internal Server Error`.

### Authentication and Authorization

- **Login**: When a user logs in, they receive a success message and their user details. You can use this information for session management.
- **Admin Rights**: The `isAdmin` field in the user data indicates whether the user has admin rights. You can use this field to differentiate between normal users and admins.

---

### Integration Steps

1. **User Login**: 
   - Frontend sends a POST request to `/api/users/login` with the user's email and password.
   - On success, the backend will respond with a success message and user details.
   - If login fails, appropriate error messages will be returned.

2. **User Registration**: 
   - Frontend sends a POST request to `/api/users/register` with the user's details.
   - The backend will create a new user and return the user details in the response.

3. **User Update**:
   - Frontend sends a PUT request to `/api/users/:id` with the user's updated details.
   - The backend will return the updated user details.

4. **Get User Info**:
   - Frontend sends a GET request to `/api/users/:id` to fetch the details of a user.



## API Routes for Orders

### 1. **Get All Orders**

#### **Endpoint**: `/api/orders/`
- **Method**: `GET`
- **Description**: Retrieves a list of all orders, populated with the user's name and sorted by the `dateOrdered` field in descending order.
- **Response**:
  ```json
  [
    {
      "id": "orderId1",
      "user": {
        "name": "User Name"
      },
      "orderItems": [ ... ],
      "totalPrice": 100,
      "status": "Pending",
      "shippingAddress1": "123 Address",
      "dateOrdered": "2024-12-06T12:34:56Z"
    }
  ]
  ```
- **Error Response**:
  - `500`: If no orders are found or there is a server error.

---

### 2. **Get Order by ID**

#### **Endpoint**: `/api/orders/:id`
- **Method**: `GET`
- **Description**: Retrieves details of a single order by its ID, including populated data for the user and order items (with product and category details).
- **Parameters**:
  - `id`: The unique identifier of the order.
- **Response**:
  ```json
  {
    "id": "orderId1",
    "user": { "name": "User Name" },
    "orderItems": [
      {
        "quantity": 2,
        "product": {
          "name": "Product Name",
          "category": { "name": "Category Name" },
          "price": 50
        }
      }
    ],
    "shippingAddress1": "123 Address",
    "totalPrice": 100,
    "status": "Pending",
    "dateOrdered": "2024-12-06T12:34:56Z"
  }
  ```
- **Error Response**:
  - `500`: If the order with the specified ID is not found or there is a server error.

---

### 3. **Create a New Order**

#### **Endpoint**: `/api/orders/`
- **Method**: `POST`
- **Description**: Creates a new order with multiple items. It calculates the total price based on the quantity of order items and their respective product prices.
- **Required Data** (in the request body):
  - `orderItems`: An array of objects representing each order item with `product` and `quantity`.
  - `shippingAddress1`: The first line of the shipping address.
  - `shippingAddress2`: The second line of the shipping address (optional).
  - `city`: The city of the shipping address.
  - `zip`: The postal code.
  - `country`: The country of the shipping address.
  - `phone`: The contact phone number.
  - `status`: The current status of the order (e.g., "Pending").
  - `user`: The user ID making the order.
- **Response**:
  ```json
  {
    "id": "orderId1",
    "user": { "name": "User Name" },
    "orderItems": [ ... ],
    "totalPrice": 100,
    "status": "Pending",
    "dateOrdered": "2024-12-06T12:34:56Z"
  }
  ```
- **Error Response**:
  - `400`: If the order cannot be created (e.g., missing required data).

---

### 4. **Update Order Status**

#### **Endpoint**: `/api/orders/:id`
- **Method**: `PUT`
- **Description**: Updates the status of an existing order (e.g., "Pending" to "Shipped").
- **Parameters**:
  - `id`: The unique identifier of the order.
- **Required Data** (in the request body):
  - `status`: The new status of the order.
- **Response**:
  ```json
  {
    "id": "orderId1",
    "status": "Shipped"
  }
  ```
- **Error Response**:
  - `400`: If the order cannot be updated (e.g., invalid data).
  - `404`: If the order with the specified ID is not found.

---

### 5. **Delete Order**

#### **Endpoint**: `/api/orders/:id`
- **Method**: `DELETE`
- **Description**: Deletes an order by its ID. Also deletes the associated order items.
- **Parameters**:
  - `id`: The unique identifier of the order.
- **Response**:
  ```json
  {
    "success": true,
    "message": "The order is deleted!"
  }
  ```
- **Error Response**:
  - `404`: If the order with the specified ID is not found.
  - `500`: If there is an error during deletion.

---

### 6. **Get Total Sales**

#### **Endpoint**: `/api/orders/get/totalsales`
- **Method**: `GET`
- **Description**: Calculates the total sales value by summing the `totalPrice` of all orders.
- **Response**:
  ```json
  {
    "totalsales": 1000
  }
  ```
- **Error Response**:
  - `400`: If the total sales cannot be generated.

---

### 7. **Get Order Count**

#### **Endpoint**: `/api/orders/get/count`
- **Method**: `GET`
- **Description**: Retrieves the total number of orders in the database.
- **Response**:
  ```json
  {
    "orderCount": 100
  }
  ```
- **Error Response**:
  - `500`: If there is an error retrieving the order count.

---

### 8. **Get Orders for a Specific User**

#### **Endpoint**: `/api/orders/get/userorders/:userid`
- **Method**: `GET`
- **Description**: Retrieves all orders made by a specific user, sorted by the `dateOrdered` field in descending order.
- **Parameters**:
  - `userid`: The unique identifier of the user.
- **Response**:
  ```json
  [
    {
      "id": "orderId1",
      "user": { "name": "User Name" },
      "orderItems": [ ... ],
      "totalPrice": 100,
      "status": "Pending",
      "dateOrdered": "2024-12-06T12:34:56Z"
    }
  ]
  ```
- **Error Response**:
  - `500`: If there is an error fetching the user's orders.

---

### Error Handling

- For **GET** requests:
  - `500`: Indicates a server error or when the resource (order, user) is not found.
- For **POST** requests:
  - `400`: Indicates bad request, such as missing required fields.
- For **PUT/DELETE** requests:
  - `400`: If the request cannot be processed (e.g., invalid data).
  - `404`: If the resource (order) is not found.
  - `500`: For server errors during update or deletion.

---

### Integration Steps for Frontend

1. **Create Order**: Frontend sends a `POST` request to `/api/orders/` with the order details in the body.
2. **Get Orders**: Frontend sends a `GET` request to `/api/orders/` to fetch a list of orders.
3. **Update Order Status**: Frontend sends a `PUT` request to `/api/orders/:id` with the updated status in the body.
4. **Delete Order**: Frontend sends a `DELETE` request to `/api/orders/:id` to remove an order.
5. **Get Total Sales**: Frontend sends a `GET` request to `/api/orders/get/totalsales` to get the total sales value.
6. **Get User Orders**: Frontend sends a `GET` request to `/api/orders/get/userorders/:userid` to fetch all orders for a specific user.

