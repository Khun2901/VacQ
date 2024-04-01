const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const { getHospitals, 
    getHospital, 
    postHospital, 
    putHospital, 
    deleteHospital, 
    updateHospital, 
    createHospital,
    getVacCenters } = require('../controllers/hospitals')

//Include another resource routers
const appointmentRouter = require('./appointments')

const router = express.Router()

//Re-route into other resource routers
router.use('/:hospitalId/appointments/', appointmentRouter)

router.route('/vacCenters').get(getVacCenters)
router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital)
router.route('/:id').get(getHospital).put(protect, authorize('admin'), updateHospital).delete(protect, authorize('admin'), deleteHospital)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       required: 
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the hospital
 *           example: 65f26fecdb012d6d26653c32
 *         ลำดับ:
 *           type: string
 *           description: Ordinal Number
 *         name:
 *           type: string
 *           description: Hospital Name
 *         address:
 *           type: string
 *           description: House No., Street, Road
 *         district:
 *           type: string
 *           description: District
 *         province:
 *           type: string
 *           description: Province
 *         postalcode:
 *           type: string
 *           description: 5-digit postal code
 *         tel:
 *           type: string
 *           description: Telephone Number
 *         region:
 *           type: string
 *           description: Region
 *       example:
 *         id: 65f26fecdb012d6d26653c33
 *         ลำดับ: 11
 *         name: ธนบุรี 2
 *         address: 43/4 ถนนบรมราชชนนี แขวงศาลาธรรมสพน์
 *         district: ทวีวัฒนา
 *         province: กรุงเทพมหานคร
 *         postalcode: 10170
 *         tel: 02-4872100
 *         region: กรุงเทพมหานคร (Bangkok)
 */
/**
 * @swagger
 * tags:
 *   name: Hospitals
 *   description: The hospitals managing API
 */
/**
 * @swagger
 * /hospitals:
 *   get:
 *     summary: Returns the list of all the hospitals
 *     tags: [Hospitals]
 *     responses:
 *       200:
 *         description: The list of the hospitals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hospital'
 */
/**
 * @swagger
 * /hospitals/{id}:
 *   get:
 *     summary: Get the hospital by id
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital id
 *     responses:
 *       200:
 *         description: The hospital description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: The hospital was not found
 */
/**
 * @swagger
 * /hospitals:
 *   post:
 *     summary: Create a new hospital
 *     tags: [Hospitals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       201:
 *         description: The hospital was successfuly created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /hospitals/{id}:
 *   put:
 *     summary: Update the hospital by the id
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       200:
 *         description: The hospital was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: The hospital was not found
 *       500:
 *         description: Some error happened
 */
/**
 * @swagger
 * /hospitals/{id}:
 *   delete:
 *     summary: Remove the hospital by the id
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital id
 *     responses:
 *       200:
 *         description: The hospital was deleted
 *       404:
 *         description: The hospital was not found
 */