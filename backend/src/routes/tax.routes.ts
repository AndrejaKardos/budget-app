import express from 'express'
import taxController from '../controllers/tax.controller'

const router = express.Router()

router.get('/incomeTax', taxController.calculateIncomeTax)

export default router