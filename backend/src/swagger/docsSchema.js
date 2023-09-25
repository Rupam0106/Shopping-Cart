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
 */