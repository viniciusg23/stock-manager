# IStock API Documentation

## Introduction

Welcome to the documentation for the IStock API, a component of the inventory management system. This API provides endpoints for user actions, category management, supplier management, sales, employees, products, and ETL (Extract, Transform, Load) operations.

## User Actions

### Register User

#### Endpoint: `POST /user/register`

This endpoint allows you to register a new user.

**Request Type:** HTTP POST

**Request Body:**
```json
{
    "name": "user",
    "password": "123",
    "systemPassword": "senha"
}
```

**Response:**
- Status: 201 - Created
- **message** (string): A message confirming the successful registration.

**Response Example:**
```json
{
    "message": "User created"
}
```

### Login User

#### Endpoint: `POST /user/login`

This endpoint is used to authenticate a user by providing their name and password.

**Request Type:** HTTP POST

**Request Body:**
```json
{
    "name": "Admin",
    "password": "123"
}
```

**Response:**
- Status: 200 OK
- **message**: A message indicating the result of the login attempt.
- **authorization**: The authorization token for the authenticated user.

**Response Example:**
```json
{
    "message": "Login was successful.",
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3MDQxNjc1MjQsImV4cCI6MTcwNDc3MjMyNH0.em9qr7Fq63lZEpz2CvZZnKx0Ep9bdsgJpiCq6ZdRSjY"
}
```

## Manage Categories

### Remove Category

#### Endpoint: `POST /category/remove`

This endpoint allows you to remove a category.

**Request Type:** HTTP POST

**Request Body:**
```json
{
    "id": "65938a8612c51396aab7ac2a"
}
```

**Response:**
- Status: 200
- **message** (string): A message indicating the result of the removal operation.

**Response Example:**
```json
{
    "message": "Category removed."
}
```

### Create Category

#### Endpoint: `POST /category/create`

This endpoint allows you to create a new category.

**Request Type:** HTTP POST

**Request Body:**
```json
{
    "name": "categoria X",
    "fiscalCode": "12.123.12"
}
```

**Response:**
- Status: 200
- **message** (string): A message confirming the success of the category creation.

**Response Example:**
```json
{
    "message": "Category was successfully created."
}
```

### View Categories

#### Endpoint: `GET /category/view`

This endpoint makes an HTTP GET request to retrieve the list of categories.

**Response:**
- Status: 200
- The response includes a **message** and an array of categories, where each category contains a name, fiscal code, and ID.

**Response Example:**
```json
{
    "message": "All categories found",
    "categories": [
        {
            "name": "Brinco",
            "fiscalCode": "12,123,12",
            "id": "654bef730041c648ff868755"
        },
        {
            "name": "Calça",
            "fiscalCode": "33,333,33",
            "id": "6552a57f57d36820f30580e1"
        }
        // Additional categories...
    ]
}
```

## Manage Suppliers

### Remove Supplier

#### Endpoint: `POST /supplier/remove`

This endpoint is used to remove a supplier.

**Request Type:** HTTP POST

**Request Body:**
```json
{
    "id": "65938cfc12c51396aab7ac2f"
}
```

**Response:**
- Status: 201
- **message** (string): A message confirming the successful removal of the supplier.

**Response Example:**
```json
{
    "message": "Supplier excluded"
}
```

### Get all Suppliers

#### Endpoint: `GET /supplier/view`

This endpoint makes an HTTP GET request to retrieve information about suppliers.

**Response:**
- Status: 200
- The response includes a **message** and a list of suppliers, where each supplier has a name, description, and an ID.

**Response Example:**
```json
{
    "message": "All suppliers found",
    "suppliers": [
        {
            "name": "Alice",
            "description": "Alice de Belo Horizonte",
            "id": "654bef860041c648ff86875d"
        },
        {
            "name": "Lucas",
            "description": "No description",
            "id": "655ca2ebada1f23147e3e5c4"
        }
        // Additional suppliers...
    ]
}
```

### Create new Supplier

#### Endpoint: `POST /supplier/create`

This endpoint allows you to create a new supplier.

**Request Type:** HTTP POST

**Request Body:**
```json
{
    "name": "Supplier for Example",
    "description": "Supplier created for Example"
}
```

**Response:**
Upon successful creation, the endpoint will return a status code of 201 and a JSON response with a message confirming the action.

**Response Example:**
```json
{
    "message": "Supplier created successfully"
}
```

## Manage Products

### Remove Product

#### Endpoint: `POST /product/remove`

This endpoint is used to remove a product.

**Request Type:** HTTP POST

**Request Body:**
- **id** (string, required): The ID of the product to be removed.

**Request Example:**
```json
{
    "id": "65623210bc53759ffe360ffb"
}
```

**Response:**
- Status: 201
- **message** (string): A message confirming the removal of the product.

**Response Example:**
```json
{
    "message": "Product excluded"
}
```

### Create QR Code

#### Endpoint: `GET /product/create-qrcode/:id`

This endpoint makes an HTTP GET request to retrieve a QR code for a specific product ID. The product ID is provided as a path parameter in the URL.

**Request:**
- Path parameter
  - `id`: The ID of the product for which the QR code is to be generated.

**Response:**
- Status: 200 OK
- `message`: A message related to the QR code generation.
- `qrCode`: The generated QR code for the specified product ID.

**Response Example:**
```json
{
    "message": "QR Code was successfully created.",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAkl..."
}
```

### Edit Product

#### Endpoint: `POST /product/edit`


This endpoint is used to edit a product.

**Request Type:** HTTP POST

**Request Body:**
- `isFiscal` (boolean): Indicates if the product is fiscal.
- `id` (string): The product ID.
- `category` (string): The category of the product.
- `name` (string): The name of the product.
- `quantity` (integer): The quantity of the product.
- `costPrice` (integer): The cost price of the product.
- `salePrice` (integer): The sale price of the product.
- `purchaseMonth` (integer): The month of purchase.
- `purchaseYear` (integer): The year of purchase.
- `supplier` (string): The supplier of the product.
- `code` (string): The code of the product.

**Request Example:**
```json
{
    "isFiscal": true,
    "id": "65623210bc53759ffe360ffb",
    "category": "654bef730041c648ff868755",
    "name": "Example Product Edited",
    "quantity": 10,
    "costPrice": 50.99,
    "salePrice": 79.99,
    "purchaseMonth": 10,
    "purchaseYear": 2023,
    "supplier": "654bef860041c648ff86875d",
    "code": "1EE1CHI06099"
}
```

**Response:**
- `message` (string): A message indicating the status of the request.

**Response Example:**
```json
{
    "message": "Product Updated"
}
```

### Create New Product

#### Endpoint: `POST /product/create`

This endpoint is used to create a new product.

**Request Type:** HTTP POST

**Request Body:**
- `isFiscal` (boolean, required): Indicates if the product is fiscal.
- `category` (string, required): The category of the product.
- `name` (string, required): The name of the product.
- `quantity` (number, required): The quantity of the product.
- `costPrice` (number, required): The cost price of the product.
- `salePrice` (number, required): The sale price of the product.
- `purchaseMonth` (number, required): The month of purchase.
- `purchaseYear` (number, required): The year of purchase.
- `supplier` (string, required): The supplier of the product.

**Request Example:**
```json
{
    "isFiscal": false,
    "category": "654bef730041c648ff868755",
    "name": "Product Example",
    "quantity": 5,
    "costPrice": 10.99,
    "salePrice": 19.99,
    "purchaseMonth": 3,
    "purchaseYear": 2023,
    "supplier": "654bef860041c648ff86875d"
}
```

**Response:**
- Status: 201
- `message` (string): A message indicating the status of the product creation.

**Response Example:**
```json
{
    "message": "Product registered"
}
```

### Get all Products

#### Endpoint: `GET /product/view`

This endpoint retrieves the details of products.

**Response:**
- `message` (string): A message related to the response.
- `products` (array): An array of product objects, each containing details such as product code, fiscal status, category, name, quantity, cost price, sale price, purchase month, purchase year, supplier, and product ID.

**Response Example:**
```json
{
    "message": "All products found.",
    "products": [
        {
            "code": "0.10215313967638062",
            "isFiscal": true,
            "category": {
                "name": "Brinco",
                "fiscalCode": "12,123,12",
                "id": "654bef730041c648ff868755"
            },
            "name": "Brinco de Ouro",
            "quantity": 2,
            "costPrice": 200,
            "salePrice": 260,
            "purchaseMonth": "Janeiro",
            "purchaseYear": 2023,
            "supplier": {
                "name": "Alice",
                "description": "Alice de Belo Horizonte",
                "id": "654bef860041c648ff86875d"
            },
            "id": "654bef980041c648ff868766"
        },
        {
            "code": "0.46010644324847716",
            "isFiscal": true,
            "category": {
                "name": "Calça",
                "fiscalCode": "33,333,33",
                "id": "6552a57f57d36820f30580e1"


            },
            "name": "Calça Jeans",
            "quantity": 13,
            "costPrice": 120,
            "salePrice": 220,
            "purchaseMonth": "Janeiro",
            "purchaseYear": 2023,
            "supplier": {
                "name": "Alice",
                "description": "Alice de Belo Horizonte",
                "id": "654bef860041c648ff86875d"
            },
            "id": "6552a5a157d36820f30580ec"
        }
        // Additional products...
    ]
}
```

## Manage Employee 

### Create Employee

#### Endpoint: `POST /employee/create`

This endpoint allows you to create a new employee.

**Request Type:** HTTP POST

**Request Body:**
```json
{
    "name": "Example Employee",
    "job": "Seller"
}
```

**Response:**
- **message** (string): A message indicating the status of the request.

**Response Example:**
```json
{
    "message": "Employee was successfully created."
}
```

### View Employees

#### Endpoint: `GET /employee/view`

This endpoint makes an HTTP GET request to retrieve the details of all employees.

**Response:**
- Status: 200 OK
- The response includes a **message** and an array of employees, where each employee contains information about their name, job title, and ID.

**Response Example:**
```json
{
    "message": "All employees found.",
    "employees": [
        {
            "name": "Vinícius",
            "job": "Vendedor",
            "id": "6552a63c57d36820f305810f"
        },
        {
            "name": "Diego",
            "job": "Atendente",
            "id": "6552a63c57d36820f305810g"
        }
        // Additional employees...
    ]
}
```

### Remove Employee

#### Endpoint: `POST /employee/remove`

This endpoint is used to remove an employee.

**Request Body:**
```json
{
    "id": "6552a63c57d36820f305810f"
}
```

**Response:**
- Status: 200 OK
- **message** (string): A message confirming the successful removal of the employee.

**Response Example:**
```json
{
    "message": "Employee removed."
}
```

## Manage Sales

### View Sales

#### Endpoint: `GET /sale/view`

This endpoint makes an HTTP GET request to retrieve the details of all sales.

**Response:**
- Status: 200 OK
- The response includes a **message** and an array of sales, where each sale contains information about the product, quantity, sale price, employee involved, total price, and buyer name.

**Response Example:**
```json
{
    "message": "All sales found.",
    "sales": [
        {
            "product": {
                "code": "0.10215313967638062",
                "isFiscal": true,
                "category": {
                    "name": "Brinco",
                    "fiscalCode": "12,123,12",
                    "id": "654bef730041c648ff868755"
                },
                "name": "Brinco de Ouro",
                "quantity": 1,
                "costPrice": 200,
                "salePrice": 260,
                "purchaseMonth": "Janeiro",
                "purchaseYear": 2023,
                "supplier": {
                    "name": "Alice",
                    "description": "Alice de Belo Horizonte",
                    "id": "654bef860041c648ff86875d"
                },
                "id": "654bef980041c648ff868766"
            },
            "quantity": 1,
            "salePrice": 260,
            "employee": {
                "name": "Vinícius",
                "job": "Vendedor",
                "id": "6552a63c57d36820f305810f"
            },
            "totalPrice": 260,
            "buyerName": "Ana Paula",
            "id": "6552a66057d36820f305811a"
        }
    ]
}
```

### Register Sell

#### Endpoint: `POST /sale/sell`

This endpoint allows you to sell a product by making an HTTP POST request to the specified URL.

**Request Type:** HTTP POST

**Request Body:**
```json
{
    "productId": "654bef980041c648ff868766",
    "quantity": 1,
    "salePrice": 260,
    "employeeId": "65542c51ed888cd6b70b02f6",
    "systemPassword": "senha",
    "buyerName": "João",
    "buyerEmail": "",
    "buyerNumber": ""
}
```

**Response:**
- Status: 200
- **message** (string): A message indicating the success of the sale.

**Response Example:**
```json
{
    "message": "Sale successful"
}
```

# ETL Operations

### Total Products in Stock

#### Endpoint: `GET /etl/total-products-stock`

This endpoint makes an HTTP GET request to retrieve the total number of products in stock.

**Response:**
- Status: 200 OK
- **message** (string): A message related to the response.
- **result** (number): The total number of products in stock.

**Response Example:**
```json
{
    "message": "All data found.",
    "result": 33
}
```

### Total Products Sold

#### Endpoint: `GET /etl/total-product-sold`

This endpoint retrieves the total number of products sold.

**Response:**
- Status: 200 OK
- **message** (string): A message related to the response.
- **result** (number): The total number of products sold.

**Response Example:**
```json
{
    "message": "All data found.",
    "result": 8
}
```

### Total Profit By Employee

#### Endpoint: `GET /etl/total-profit-employee`

This endpoint makes an HTTP GET request to retrieve the total profit for each employee.

**Response:**
- Status: 200 OK
- **message** (string): A message related to the response.
- **result** (array): An array of objects containing the employee's name and their total sale amount.

**Response Example:**
```json
{
    "message": "All data found",
    "result": [
        {
            "employee": "Diego",
            "totalSale": 2070
        },
        {
            "employee": "Lucas",
            "totalSale": 780
        },
        {
            "employee": "Alice",
            "totalSale": 300
        }
    ]
}
```

### Total Profit

#### Endpoint: `GET /etl/total-profit`

This endpoint makes an HTTP GET request to retrieve the total profit related to ETL operations.

**Response:**
- Status: 200 OK
- **message** (string): A message related to the result.
- **result** (string): The total profit related to ETL operations.

**Response Example:**
```json
{
    "message": "Total profit in the last 30 days.",
    "result": "5350.00"
}
```

### Percentage Of Sales By Category

#### Endpoint: `GET /etl/percentage-sales-category`

This endpoint makes an HTTP GET request to retrieve the percentage sales for each category.

**Response:**
- Status: 200 OK
- **message** (string): A message related to the response.
- **result** (array): An array of objects containing the category and its corresponding percentage of sales.

**Response Example:**
```json
{
    "message": "All data found",
    "result": [
        {
            "category": "Calça",
            "percentage": 0.6206896551724138
        },
        {
            "category": "Brinco",
            "percentage": 0.20689655172413793
        },
        {
            "category": "Sapato",
            "percentage": 0.1724137931034483
        }
    ]
}
```