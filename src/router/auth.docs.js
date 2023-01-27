/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Users email address
 *         productName:
 *           email: string
 *           password: Users password for authentication
 *       example:
 *         email: user@gmail.com
 *         password: userpassword
 * 
 *
 *tags:
 *   name: Authentication
 *   description: Authentication Api Management
 * 
 * /user/login:
 *   post:
 *     summary: Login User
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: A product Created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 *       400:
 *        description: Invalid Request
 * 
 * */