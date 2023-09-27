/**
 * @openapi
 * /api/v1/product/new:
 *  post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Product
 *     summary: Add Product
 *     description: Responds if the app is up and running
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateProductResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
/**
 * @openapi
 * /api/v1/products:
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags: [Product]
 *     summary: get Products
 *     description: Responds if the app is up and running
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProductResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * /api/v1/product/{id}:
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags: [Product]
 *     summary: get Single Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '650c2d13e6e25c0fdf978d75'
 *     description: Responds if the app is up and running
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProductResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
/**
 * @openapi
 * /api/v1/product/search/{searchTerm}:
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags: [Product]
 *     summary: Search  particular product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: phone
 *     description: Responds if the app is up and running
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProductResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
/**
 * @openapi
 * /api/v1/product/{id}:
 *  put:
 *     security:
 *      - bearerAuth: []
 *     tags: [Product]
 *     summary: Update the Existing Product
 *     description: Responds if the app is up and running
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProductResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
/**
 * @openapi
 * /api/v1/product/{id}:
 *  delete:
 *     security:
 *      - bearerAuth: []
 *     tags: [Product]
 *     summary: delete Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '650c2d13e6e25c0fdf978d75'
 *     description: Responds if the app is up and running
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProductResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
