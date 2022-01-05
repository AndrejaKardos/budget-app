import express from 'express'
import taxRoutes from './tax.routes'
import transactionsRoutes from './transactions.routes'

const router = express.Router()
router.use(taxRoutes)
router.use(transactionsRoutes)

export default router