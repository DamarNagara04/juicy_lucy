## API Reference

### List of Available Endpoints:

| Method  | Endpoints        | Description                                                                          |
| :------ | :--------------- | :----------------------------------------------------------------------------------- |
| `POST`  | `/registration`  | Register Form to Create a New Admin User                                             |
| `POST`  | `/login`         | Login Form to Login to Home Page                                                     |
| `POST`  | `/googleLogin`   | Login and or register using Google Account                                           |
| `POST`  | `/githubLogin`   | Login and or register using Github Account                                           |
| `POST`  | `/midtransToken` | Use third-party API payment gateway midtrans                                         |
| `GET`   | `/fruit`         | Get all main entities (fruit) data                                                   |
| `GET`   | `/order`         | Get all logged user order data                                                       |
| `POST`  | `/order/:id`     | Create new order data with params of fruit id                                        |
| `POST`  | `/transaction`   | Create a new transaction data                                                        |
| `GET`   | `/transaction`   | Get all logged user transaction data                                                 |
| `PATCH` | `/transaction`   | Update a transaction isPaid status to true after completing midtrans payment gateway |

## POST /register

### Request:

- Body:

```json
{
  "username": String,
  "email": string,
  "password": string,
  "phoneNumer": string,
  "address": string,
}
```

### Response

_200 - OK_

```json
{
  "id": Integer,
  "email": String
}
```

_400 - Bad Request_

```json
{
  "message": "Email Address already exist"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Email needs to be a proper Email Address"
}
OR
{
  "message": "Password cannot be empty"
}
OR
{
  "message": "Password Needs To Be Atleast 5 Character Length"
}
```

## POST /login

### Request:

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

_200 - OK_

```json
{
  "access_token": String,
}
```

_401 - Unauthorized_

```json
{
  "message": "Email/Password are Invalid"
}
```

## POST /loginGoogle

### Request:

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

_200 -OK_

```json
{
  {
  "access_token": String,
  "data": {
     "id": Integer,
     "username": String,
     "email": String,
  }
}
}
```

_401 - Unauthorized_

```json
{
  "statusCode": 401,
  "message": "Invalid Token!"
}
```

## POST /githubLogin

### Request:

- Body:

```json
{
  "email": "string",
  "username": "string",
  "imageUrl": "string"
}
```

### Response

_200 -OK_

```json
{
  {
  "access_token": String,
  "data": {
     "id": Integer,
     "username": String,
     "email": String,
  }
}
}
```

_401 - Unauthorized_

```json
{
  "statusCode": 401,
  "message": "Invalid Token!"
}
```

## POST /midtransToken

### Request:

- Headers:

```json
{
   "access_token": String
}
```

- Body:

```json
{
  "amount": Integer
}
```

### Response

_200 -OK_

```json
{
   "token": String,
   "redirec_url": String
}
```

_400 - Bad Request_

```json
{
  "message": "Amount Required"
}
```

## GET /fruit

### Request:

- Query:

```json
{
  "page": Integer,
  "search": String,
  "limit": Integer
}
```

### Response

_200 -OK_

```json
[
  {
    "id": Integer,
    "name": String,
    "calories": Integer,
    "serving_size_g": Integer,
    "fat_total_g": Integer,
    "fat_saturated_g": Integer,
    "protein_g": Integer,
    "sodium_mg": Integer,
    "potassium_mg": Integer,
    "cholesterol_mg": Integer,
    "carbohydrates_total_g": Integer,
    "fiber_g": Integer,
    "sugar_g": Integer,
    "imageUrl": null
  },
  ...
]
```

_404 - Not Found_

```json
{
  "message": "Fruit Not Found"
}
```

## GET /order

### Request

- Headers:

```json
{
   "access_token": String
}
```

### Response

_200 -OK_

```json
[
  {
    "id": 1,
    "UserId": 1,
    "FruitId": 1,
    "quantity_gram": 200,
    "Fruit": {
         "id": Integer,
         "name": String,
         "calories": Integer,
         "serving_size_g": Integer,
         "fat_total_g": Integer,
         "fat_saturated_g": Integer,
         "protein_g": Integer,
         "sodium_mg": Integer,
         "potassium_mg": Integer,
         "cholesterol_mg": Integer,
         "carbohydrates_total_g": Integer,
         "fiber_g": Integer,
         "sugar_g": Integer,
         "imageUrl": null
      }
  },
  ...
]
```

_404 - Not Found_

```json
{
  "message": "Error Not Found"
}
```

## POST /order/:id

### Request

- Headers:

```json
{
   "access_token": String
}
```

### Response

_200 -OK_

```json
{
  "message": "Order Created",
  "response": {
    "id": Integer,
    "UserId": Integer,
    "FruitId": Integer,
    "quantity_gram": Integer,
    "updatedAt": Date,
    "createdAt": Date
  }
}
```

_404 - Not Found_

```json
{
  "message": "Fruit Not Found"
}
```

## POST /transaction/

### Request

- Headers:

```json
{
   "access_token": String
}
```

### Response

_200 -OK_

```json
{
  "message": "Transaction Created",
  "response": {
    "id": Integer,
    "UserId": Integer,
    "OrderId": Integer,
    "amount": Integer,
    "isPaid": Boolean,
    "updatedAt": Date,
    "createdAt": Date
  }
}
```

_400 - Bad Request_

```json
{
   "message": "Order Id Required"
}
OR
{
   "message": "Amount Required"
}

```

_404 - Not Found_

```json
{
  "message": "Error Not Found"
}
```

## GET /transaction

### Request

- Headers:

```json
{
   "access_token": String
}
```

### Response

_200 -OK_

```json
[
  {
    "id": Integer,
    "UserId": Integer,
    "OrderId": Integer,
    "amount": Integer,
    "isPaid": Boolean,
    "createdAt": Date,
    "updatedAt": Date
  }
  ...
]
```

_404 - Not Found_

```json
{
  "message": "Error Not Found"
}
```

## PATCH /transaction/

### Request

- Headers:

```json
{
   "access_token": String
}
```

### Response

_200 -OK_

```json
{
  "message": "Transaction Created",
  "response": {
    "id": Integer,
    "UserId": Integer,
    "OrderId": Integer,
    "amount": Integer,
    "isPaid": Boolean,
    "updatedAt": Date,
    "createdAt": Date
  }
}
```

_400 - Bad Request_

```json
{
  "message": "Transaction Id Not Found"
}
```

_404 - Not Found_

```json
{
  "message": "Error Not Found"
}
OR
{
   "message": "Transaction Not Found"
}

```

## Global Error

### Response

_401 - Unauthorized_

- Body
  ```json
  {
    "message": "InvalidToken"
  }
  ```

_500 - Internal Server Error_

- Body

  ```json
  {
    "message": "Internal Server Error"
  }
  ```
