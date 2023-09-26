/**
 * @openapi
 * '/api/v1/user/register':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * /api/v1/user/login:
 *  post:
 *     tags: [User]
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserLoginInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * /api/v1/user/password:
 *  put:
 *     security:
 *      - bearerAuth: []
 *     tags: [User]
 *     summary: Update the password
 *     description: Responds if the app is up and running
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdatePasswordInput'
 *     responses:
 *       200:
 *         description: App is up and running
 */

/**
 * @openapi
 * /api/v1/user/me:
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags: [User]
 *     summary: get User Profile
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

/**
 * @openapi
 * /api/v1/user/me:
 *  delete:
 *     security:
 *      - bearerAuth: []
 *     tags: [User]
 *     summary: Delete User Profile
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

/**
 * @openapi
 * /api/v1/user/logout:
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags: [User]
 *     summary: Logout User
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */