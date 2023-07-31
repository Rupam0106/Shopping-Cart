# Backend

## API's Documentation
### https://ecommerce-backend-xp0v.onrender.com/api-docs/


## Model

1. User
2. Product
3. Cart
4. Order

## User

### Models

- User Model

```yaml
{
  name:
    {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [2, "Name should have more than 2 characters"],
    },
  email:
    {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
  password:
    {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
  avatar:
    {
      type: String,
      required: [true, "Please Provide Profile Image"],
      trim: true,
    },
  createdAt: { type: Date, default: Date.now },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
}
```

## User APIs

### POST https://ecommerce-backend-xp0v.onrender.com/api/v1/user/register

- Create a user document from request body. Request body must contain image.
- Save password in encrypted format. (used bcryptjs)
- **Response format**
  - _**On success**_ - Return HTTP status 201. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "success": true,
  "user":
    {
      "name": "Rupam",
      "email": "rupam@gmail.com",
      "password": "$2a$10$UMY5NnQf.giD52Lo.qjX..q6EOjTomEhfaYJyebYfIXcsjlTpBxGS",
      "avatar": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/RupamStore/download.jpeg",
      "_id": "64993c6f1b244cc09b41d274",
      "createdAt": "2023-06-26T07:21:19.104Z",
      "__v": 0,
    },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWE3Njg3ZjNiMzNlYjZmY2JmYzc1OSIsImlhdCI6MTY4Nzg2NzgxOCwiZXhwIjoxNjg3OTU0MjE4fQ.BzDAL99s6fTYAFF89zKbYHm5738nYdB1Fm3YsJAIUjg",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWE3Njg3ZjNiMzNlYjZmY2JmYzc1OSIsImlhdCI6MTY4Nzg2NzgxOCwiZXhwIjoxNjg3ODg5NDE4fQ.0Q5Q7nec0MMKYeRumpGp5p0B0RFfadkOvspKLS04FI8",
}
```

### POST https://ecommerce-backend-xp0v.onrender.com/api/v1/user/login

- Allow an user to login with their email and password.
- **Response format**
  - _**On success**_ - Return HTTP status 200 and JWT token in response body. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "success": true,
  "user":
    {
      "_id": "649a7687f3b33eb6fcbfc759",
      "name": "Rupam",
      "email": "rupam@gmail.com",
      "password": "$2a$10$/fB/6WpqbGxmjqunPUUUBOEycMnOh6NgzlJ4f3rGHzulTTxC9Gj3W",
      "avatar": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/RupamStore/rupam.jpeg",
      "createdAt": "2023-06-27T05:41:27.148Z",
      "__v": 0,
    },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWE3Njg3ZjNiMzNlYjZmY2JmYzc1OSIsImlhdCI6MTY4Nzg2NzgxOCwiZXhwIjoxNjg3OTU0MjE4fQ.BzDAL99s6fTYAFF89zKbYHm5738nYdB1Fm3YsJAIUjg",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWE3Njg3ZjNiMzNlYjZmY2JmYzc1OSIsImlhdCI6MTY4Nzg2NzgxOCwiZXhwIjoxNjg3ODg5NDE4fQ.0Q5Q7nec0MMKYeRumpGp5p0B0RFfadkOvspKLS04FI8",
}
```

### POST https://ecommerce-backend-xp0v.onrender.com/api/v1/user/refresh-token

- Generate the refresh token
- **Response format**
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{ "success": true, "message": "Refresh token generated Successfully" }
```

### GET https://ecommerce-backend-xp0v.onrender.com/api/v1/user/logout

- logout user if Only the user login
- **Response format**
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{ "sucess": true, "message": "Logged Out Successfully" }
```

### POST https://ecommerce-backend-xp0v.onrender.com/api/v1/user/password/forgot

- User can forgot the password using their Email_id
- **Response format**
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{ "success": true, "message": "Email sent to rupam@gmail.com successfully" }
```

### PUT https://ecommerce-backend-xp0v.onrender.com/api/v1/user/password/reset/:token

- User can reset the password and put the new confirm password and password.
- **Response format**
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "success": true,
  "user":
    {
      "_id": "64993c6f1b244cc09b41d274",
      "name": "Rupam",
      "email": "rupam@gmail.com",
      "avatar": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/RupamStore/download.jpeg",
      "createdAt": "2023-06-26T07:21:19.104Z",
      "__v": 0,
      "password": "$2a$10$Qh/Y6j6.o5jSM836yjS3POlVQU8MsC/wxqHtAZk3U4ANTwjyQILv2",
    },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTkzYzZmMWIyNDRjYzA5YjQxZDI3NCIsImlhdCI6MTY4Nzc2NDE2MiwiZXhwIjoxNjg3ODUwNTYyfQ.goU1Brt18EX6ewxmXMdejoC3cGf0gHwsoiHhmGa-0B4",
}
```

### GET https://ecommerce-backend-xp0v.onrender.com/api/v1/user/user/me

- User can view their own profile.
- **Response format**
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "success": true,
  "user":
    {
      "_id": "64994649e50d7959bd931f10",
      "name": "Rupam",
      "email": "rupam@gmail.com",
      "avatar": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/RupamStore/download.jpeg",
      "createdAt": "2023-06-26T08:03:21.771Z",
      "__v": 0,
    },
}
```

### DELETE https://ecommerce-backend-xp0v.onrender.com/api/v1/user/user/me/delete

- User can delete their own profile
- **Response format**
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{ "success": true, "message": "User Deleted Successfully" }
```

## Product

### Models

- Product Model

```yaml
{
    title: {
      type: String,
      required: [true, "Please Enter title of the Product"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Description of the Product"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please Enter Price of the Product"],
    },
    productImage: {
      type: String,
      required: [true, "Please Provide Product Image"],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
```

## Product APIs

### POST https://ecommerce-backend-xp0v.onrender.com/api/v1/product/new

- Create a Product document from request body. Request body must contain product image.
- **Response format**
  - _**On success**_ - Return HTTP status 201. Also return the product document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "success": true,
  "product":
    {
      "title": "Canon Camera 850D",
      "description": "best camra for wedding photography",
      "price": 80000,
      "stock": 500,
      "productImage": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/RupamStore/canon_eos_850d_01.jpg",
      "deletedAt": null,
      "_id": "64996202cc0aa86de2b95947",
      "createdAt": "2023-06-26T10:01:38.287Z",
      "updatedAt": "2023-06-26T10:01:38.287Z",
      "__v": 0,
    },
}
```

### GET https://ecommerce-backend-xp0v.onrender.com/api/v1/product/all

- Only Login user can view the product.
- **Response format**
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "success": true,
  "products":
    [
      {
        "_id": "64996195faea92165322d3fc",
        "title": "Canon Camera 850D",
        "description": "best camra for wedding photography",
        "price": 80000,
        "stock": 500,
        "productImage": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/RupamStore/canon_eos_850d_01.jpg",
        "deletedAt": null,
        "createdAt": "2023-06-26T09:59:49.554Z",
        "updatedAt": "2023-06-26T09:59:49.554Z",
        "__v": 0,
      },
      {
        "_id": "64996202cc0aa86de2b95947",
        "title": "Canon Camera 250D",
        "description": "best camera for wild-life photography",
        "price": 76500,
        "stock": 500,
        "productImage": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/RupamStore/canon_eos_250d_01.jpg",
        "deletedAt": null,
        "createdAt": "2023-06-26T10:01:38.287Z",
        "updatedAt": "2023-06-26T10:01:38.287Z",
        "__v": 0,
      },
    ],
}
```

### GET https://ecommerce-backend-xp0v.onrender.com/api/v1/product/:id

- Get single product with their id .
- **Response format**
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "success": true,
  "product":
    {
      "_id": "64996195faea92165322d3fc",
      "title": "Canon Camera 850D",
      "description": "best camra for wedding photography",
      "price": 80000,
      "productImage": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/RupamStore/canon_eos_850d_01.jpg",
      "deletedAt": null,
      "stock": 500,
      "createdAt": "2023-06-26T09:59:49.554Z",
      "updatedAt": "2023-06-26T09:59:49.554Z",
      "__v": 0,
    },
}
```

### PUT https://ecommerce-backend-xp0v.onrender.com/api/v1/product/:id

- User can update the product using their id;
- **Response format**
  - _**On success**_ - Return HTTP status 200. Also return the product document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "success": true,
  "product":
    {
      "title": "Canon Camera 850D",
      "description": "best camra for wedding photography",
      "price": 60000,
      "stock": 500,
      "productImage": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/RupamStore/canon_eos_850d_01.jpg",
      "deletedAt": null,
      "_id": "64996202cc0aa86de2b95947",
      "createdAt": "2023-06-26T10:01:38.287Z",
      "updatedAt": "2023-06-26T10:01:38.287Z",
      "__v": 0,
    },
}
```

### DELETE https://ecommerce-backend-xp0v.onrender.com/api/v1/product/:id

- User can Delete the product using their id;
- **Response format**
  - _**On success**_ - Return HTTP status 200. Also return the suitable message. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{ "success": true, "message": "Product Deleted Successfully" }
```

### Models

- Cart Model

```yaml
{
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      unique: true,
      trim: true,
    },
    items: {
      type: [
        {
          productId: {
            type: ObjectId,
            ref: "Product",
            required: [true, "Please provide productId!"],
          },
          quantity: {
            type: Number,
            required: [true, "Please enter a Qty!"],
            min: 1,
          },
          price: {
            type: Number,
            require: [true, "Please provide price of product!"],
            select: false,
          },
        },
      ],
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalQuantity: {
      type: Number,
      default: 1,
    },
    totalItems: {
      type: Number,
      default: 1,
      required: true,
      // comment: 'Holds total number of items in the cart',
    },
  },
  { timestamps: true }
```

## Cart APIs

### POST https://ecommerce-backend-xp0v.onrender.com/api/v1/user/cart/create

- Create a Cart with added to particular product items.
- **Response format**
  - _**On success**_ - Return HTTP status 201. Also return the cart document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "Success",
  "data":
    {
      "newCart":
        {
          "_id": "649aae26c59133d97f499b5c",
          "userId": "649a7687f3b33eb6fcbfc759",
          "items":
            [
              {
                "productId": "649a77bff3b33eb6fcbfc76c",
                "quantity": 2,
                "_id": "649ab2a1b23d4758fe2bd568",
              },
            ],
          "totalPrice": 156000,
          "totalQuantity": 2,
          "totalItems": 1,
          "createdAt": "2023-06-27T09:38:46.893Z",
          "updatedAt": "2023-06-27T09:57:57.324Z",
          "__v": 5,
        },
    },
}
```

### GET https://ecommerce-backend-xp0v.onrender.com/api/v1/user/cart/all

- Get the cart details with their product.
- **Response format**
  - _**On success**_ - Return HTTP status 200. Also return the cart document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "Success",
  "data":
    {
      "newCart":
        {
          "_id": "649aae26c59133d97f499b5c",
          "userId": "649a7687f3b33eb6fcbfc759",
          "items":
            [
              {
                "productId": "649a77bff3b33eb6fcbfc76c",
                "quantity": 2,
                "_id": "649ab2a1b23d4758fe2bd568",
              },
            ],
          "totalPrice": 156000,
          "totalQuantity": 2,
          "totalItems": 1,
          "createdAt": "2023-06-27T09:38:46.893Z",
          "updatedAt": "2023-06-27T09:57:57.324Z",
          "__v": 5,
        },
    },
}
```

### PUT https://ecommerce-backend-xp0v.onrender.com/api/v1/user/cart/update

- Remove the particular product.
- **Response format**
  - _**On success**_ - Return HTTP status 200. Also return the cart document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "Success",
  "data":
    {
      "cartNew":
        {
          "_id": "649aae26c59133d97f499b5c",
          "userId": "649a7687f3b33eb6fcbfc759",
          "items":
            [
              {
                "productId": "649a77bff3b33eb6fcbfc76c",
                "quantity": 1,
                "price": 78000,
                "_id": "649ab2a1b23d4758fe2bd568",
              },
            ],
          "totalPrice": 78000,
          "totalQuantity": 1,
          "totalItems": 1,
          "createdAt": "2023-06-27T09:38:46.893Z",
          "updatedAt": "2023-06-27T09:59:43.325Z",
          "__v": 5,
        },
    },
}
```

### Models

- Order Model

```yaml
{
  {
    userId:
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter userId"],
      },
    items:
      [
        {
          productId:
            {
              type: mongoose.Types.ObjectId,
              ref: "Product",
              required: [true, "Please provide product id!"],
            },
          quantity:
            { type: Number, required: [true, "Please provide Qty!"], min: 1 },
        },
      ],
    totalPrice: { type: Number, required: [true, "Total price required!"] },
    totalItems: { type: Number, required: [true, "Total Item required!"] },

    totalQuantity: { type: Number, required: [true, "Total qty required!"] },

    cancellable: { type: Boolean, default: true },

    status:
      {
        type: String,
        default: "pending",
        enum:
          {
            values: ["pending", "completed", "canceled"],
            message: 'status should be in "pending", "completed", "canceled"',
          },
      },
    deletedAt: { type: Date },
  },
  { timestamps: true },
}
```

## Order APIs

### POST https://ecommerce-backend-xp0v.onrender.com/api/v1/user/order/create

- Create a Order with their cart Id.
- **Response format**
  - _**On success**_ - Return HTTP status 201. Also return the order document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
    "status": true,
    "message": "Your Order Placed Successfully",
    "data": {
        "order": {
            "userId": "649a7687f3b33eb6fcbfc759",
            "items": [
                {
                    "productId": "649a777bf3b33eb6fcbfc769",
                    "quantity": 4,
                    "_id": "649bd8c4af1999d97fec24c5"
                },
                {
                    "productId": "64996195faea92165322d3fc",
                    "quantity": 5,
                    "_id": "649bd8d3af1999d97fec24da"
                }
            ],
            "totalPrice": 640000,
            "totalItems": 2,
            "totalQuantity": 9,
            "cancellable": true,
            "status": "pending",
            "_id": "649bd8c4af1999d97fec24c4",
            "createdAt": "2023-06-28T06:52:52.251Z",
            "updatedAt": "2023-06-28T06:52:52.251Z",
            "__v": 0
        }
    }
}
```

### PUT https://ecommerce-backend-xp0v.onrender.com/api/v1/user/order/cancel

- Cancel the Order with their order Id.
- **Response format**
  - _**On success**_ - Return HTTP status 200. Also return the order document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
    "status": true,
    "message": "Success",
    "data": {
        "order": {
            "_id": "649bd5de84fecc5cd9e10942",
            "userId": "649a7687f3b33eb6fcbfc759",
            "items": [
                {
                    "productId": "64996195faea92165322d3fc",
                    "quantity": 4,
                    "_id": "649bd5de84fecc5cd9e10943"
                }
            ],
            "totalPrice": 320000,
            "totalItems": 1,
            "totalQuantity": 4,
            "cancellable": true,
            "status": "canceled",
            "createdAt": "2023-06-28T06:40:30.732Z",
            "updatedAt": "2023-06-28T06:45:49.496Z",
            "__v": 0
        }
    }
}
```

### PUT https://ecommerce-backend-xp0v.onrender.com/api/v1/user/order/delivered

- Complete the Order with their order Id.
- **Response format**
  - _**On success**_ - Return HTTP status 200. Also return the order document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
    "status": true,
    "message": "Order Successfully Delivered...",
    "data": {
        "order": {
            "_id": "649bd8c4af1999d97fec24c4",
            "userId": "649a7687f3b33eb6fcbfc759",
            "items": [
                {
                    "productId": "649a777bf3b33eb6fcbfc769",
                    "quantity": 4,
                    "_id": "649bd8c4af1999d97fec24c5"
                },
                {
                    "productId": "64996195faea92165322d3fc",
                    "quantity": 5,
                    "_id": "649bd8d3af1999d97fec24da"
                }
            ],
            "totalPrice": 640000,
            "totalItems": 2,
            "totalQuantity": 9,
            "cancellable": true,
            "status": "completed",
            "createdAt": "2023-06-28T06:52:52.251Z",
            "updatedAt": "2023-06-28T07:00:40.392Z",
            "__v": 0
        }
    }
}
```
## Postman Collection :-
