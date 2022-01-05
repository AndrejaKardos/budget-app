import express from 'express'
import transactionsController from '../controllers/transactions.controller'

const router = express.Router()

router.get('/transactions', transactionsController.getAllTransactions)
router.get('/transaction/:transactionId', transactionsController.getTransaction)
router.post('/transaction', transactionsController.postTransaction)
router.delete('/transaction/:transactionId', transactionsController.deleteTransaction)

export default router