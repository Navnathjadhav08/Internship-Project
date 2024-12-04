
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
## API Endpoints

### 1. **GET /api/v1/products**
   - **Description**: Retrieves a list of all products from the database. It can be filtered by categories if specified in the query string (e.g., `/api/v1/products?categories=electronics,clothing`). The response includes product details such as name, description, price, category, stock count, and more.
   - **Response**: A list of products with all their details.

---

### 2. **GET /api/v1/products/:id**
   - **Description**: Retrieves the details of a specific product by its unique `id`. It returns the product information along with its category and other attributes like name, description, price, stock count, etc.
   - **Parameters**: 
     - `id` (required): The unique identifier of the product to be fetched.
   - **Response**: The product details matching the provided ID. If the product is not found, it returns a 500 status with a relevant message.

---

### 3. **POST /api/v1/products**
   - **Description**: Creates a new product in the database. It requires product data (e.g., name, description, price, category, stock count, and image) to be sent in the request body. The image file can be uploaded using the `image` field.
   - **Request Body**: 
     - `name` (required): The name of the product.
     - `description` (required): The product description.
     - `price` (required): The price of the product.
     - `category` (required): The category ID the product belongs to.
     - `image` (required): The image file of the product.
     - Additional fields such as `brand`, `rating`, and `numReviews` can also be included.
   - **Response**: The newly created product with all the details, including a generated image URL.

---

### 4. **PUT /api/v1/products/:id**
   - **Description**: Updates the details of an existing product by its unique `id`. You can update product details like name, description, price, image, category, and other fields. The request body should contain the updated values.
   - **Parameters**: 
     - `id` (required): The unique identifier of the product to be updated.
   - **Request Body**: Updated product details (e.g., name, description, price, category, image, etc.).
   - **Response**: The updated product details. If the product is not found, it returns an error message with a 500 status.

---

### 5. **DELETE /api/v1/products/:id**
   - **Description**: Deletes a specific product from the database by its unique `id`. Once deleted, the product cannot be recovered.
   - **Parameters**: 
     - `id` (required): The unique identifier of the product to be deleted.
   - **Response**: A success message indicating that the product was deleted. If the product is not found, it returns a failure message.

---

### 6. **PUT /api/v1/products/gallery-images/:id**
   - **Description**: Updates the gallery images for a product. Multiple images can be uploaded using the `images` field. The images will be stored and associated with the product, and the product details will be updated with the new gallery images.
   - **Parameters**: 
     - `id` (required): The unique identifier of the product whose gallery images need to be updated.
   - **Request Body**: The request should include multiple images (up to 10) to be added to the product’s gallery.
   - **Response**: The updated product details with the new gallery images.

---

### 7. **GET /api/v1/products/get/featured/:count**
   - **Description**: Retrieves a list of featured products from the database. The `count` parameter specifies how many featured products to return. This is useful for showcasing a limited set of products that are highlighted or on promotion.
   - **Parameters**: 
     - `count` (required): The number of featured products to retrieve.
   - **Response**: A list of featured products, with the number of products limited to the specified count.

---

### 8. **GET /api/v1/products/get/count**
   - **Description**: Retrieves the total count of products in the database. It can be used to show the number of products available, and can be helpful for building dashboards or for managing inventory.
   - **Response**: A JSON object containing the `productCount` field that represents the total number of products in the database.
