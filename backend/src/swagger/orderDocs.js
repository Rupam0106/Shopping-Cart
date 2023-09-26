/**
 * @openapi
 * /api/v1/order:
 *  post:
 *     security:
 *      - bearerAuth: []
 *     tags: 
 *       - Order
 *     summary: Create Order
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

/**
 * @openapi
 * /api/v1/order:
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags: [Order]
 *     summary: get Order
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
/**
 * @openapi
 * /api/v1/order/{orderId}:
 *  put:
 *     security:
 *      - bearerAuth: []
 *     tags: [Order]
 *     summary: Update Existing Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '650c2d13e6e25c0fdf978d75'
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
/**
 * @openapi
 * /api/v1/order/cancel/{orderId}:
 *  put:
 *     security:
 *      - bearerAuth: []
 *     tags: [Order]
 *     summary: Cancel Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '650c2d13e6e25c0fdf978d75'
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */