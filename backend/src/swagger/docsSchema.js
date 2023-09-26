/**
 * @openapi
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: apiKey
 *      in: header
 *      name: Cookie
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: rupamgupta@gmail.com
 *        name:
 *          type: string
 *          default: Rupam Gupta
 *        password:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    CreateUserLoginInput:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          default: rupam@gmail.com
 *        password:
 *          type: string
 *          default: 12345678
 *    UpdatePasswordInput:
 *      type: object
 *      properties:
 *        oldPassword:
 *          type: string
 *          default: 12345678
 *        newPassword:
 *          type: string
 *          default: 123456789
 *        confirmPassword:
 *          type: string
 *          default: 123456789
 */
/**
 * @openapi
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: apiKey
 *      in: header
 *      name: Cookie
 *  schemas:
 *    CreateProductInput:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - productImage
 *        - price
 *        - stock
 *      properties:
 *        title:
 *          type: string
 *          default: I phone 15
 *        description:
 *          type: string
 *          default: One of the best product by Apple
 *        productImage:
 *          type: string
 *          default: https://picsum.photos/200/300
 *        price:
 *          type: number
 *          default: 1000
 *        stock:
 *          type: number
 *          default: 100
 *    CreateProductResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *        stock:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    GetProductResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        title:
 *           type: string
 *        description:
 *           type: string
 *        price:
 *           type: number
 *        stock:
 *           type: number
 *        createdAt:
 *           type: string
 *        updatedAt:
 *           type: string
 */

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: apiKey
 *      in: header
 *      name: Cookie
 *  schemas:
 *    CreateCartInput:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - productImage
 *        - price
 *        - stock
 *      properties:
 *        title:
 *          type: string
 *          default: I phone 15
 *        description:
 *          type: string
 *          default: One of the best product by Apple
 *        productImage:
 *          type: string
 *          default: https://picsum.photos/200/300
 *        price:
 *          type: number
 *          default: 1000
 *        stock:
 *          type: number
 *          default: 100
 *    CreateCartResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *        stock:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: apiKey
 *      in: header
 *      name: Cookie
 *  schemas:
 *    CreateOrderInput:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - productImage
 *        - price
 *        - stock
 *      properties:
 *        title:
 *          type: string
 *          default: I phone 15
 *        description:
 *          type: string
 *          default: One of the best product by Apple
 *        productImage:
 *          type: string
 *          default: https://picsum.photos/200/300
 *        price:
 *          type: number
 *          default: 1000
 *        stock:
 *          type: number
 *          default: 100
 *    CreateOrderResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *        stock:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */