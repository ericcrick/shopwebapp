/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       required:
 *         - productName
 *         - productPrice
 *         - productDescription
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         productName:
 *           type: string
 *           description: The name of the of the product (unique field)
 *         productPrice:
 *           type: integer
 *           description: The product price
 *         productDescription:
 *           type: string
 *           description: The description of the product
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the product was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the product was modified
 *       example:
 *         productName: Hp Surface Book
 *         productPrice: 4092.5
 *         productDescription: A mini laptop suitable for office traveling
 * 
 *
 *tags:
 *   name: Products
 *   description: Product Api Management
 * 
 * /products:
 *   get:
 *     summary: Lists all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 * 
 * 
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       201:
 *         description: A product Created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       500:
 *         description: Some server error
 *       400:
 *        description: Invalid Request
 * /products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: The product was not found
 *   put:
 *    summary: Update the product by id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Products'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Error Occured
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The products id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 * 
 * */