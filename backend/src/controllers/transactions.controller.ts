import { Request, Response } from 'express'
import * as uuid from 'uuid'
import Transaction from '../models/transaction.model'

// In-memory storage of transactions
// TODO: Replace with DB
const Txns: Transaction[] = [{ id: '111', description: 'Test', amountCents: 1000}]

/** Get all transactions currently stored */
const getAllTransactions = (req: Request, res: Response) => {
    // Return our in-memory storage as JSON
    res.json(Txns)
}

/** Get a single transaction */
const getTransaction = (req: Request, res: Response) => {
    // Pull out the transaction id from the request parameters
    const { transactionId } = req.params

    // Make sure that parameter is present
    if (!transactionId) {
        res.status(400).json({ message: 'Transaction ID missing'})
        return
    }

    // Find the transaction with that id
    const txn = Txns.find(t => t.id === transactionId)

    // Report if the transaction wasn't found
    if (!txn) {
        res.status(400).json({ message: 'Transaction ID not found'})
        return
    }

    // Return the transaction
    res.json(txn)
}

/** Create a new transaction */
const postTransaction = (req: Request, res: Response) => {
    // Pull out the values from the request body
    const { description, amountCents: amount } = req.body

    // Ensure description is present
    if (description === null || description === undefined) {
        res.status(400).json({ message: 'description is required'})
    }
    
    // Ensure that amount is a number
    const amountCents = parseInt(amount)
    if (isNaN(amountCents)) {
        res.status(400).json({ message: 'amountCents must be a number'})
        return
    }

    // Generate a new ID for this transaction
    const id = uuid.v4();

    // Add transaction to in-memory store
    Txns.push({ id, description, amountCents })

    // Return a list of new transactions
    return getAllTransactions(req, res)
}

/** Delete a specific transaction */
const deleteTransaction = (req: Request, res: Response) => {
    // Pull out the transaction id from the request parameters
    const { transactionId } = req.params

    // Make sure that parameter is present
    if (!transactionId) {
        res.status(400).json({ message: 'Transaction ID missing'})
        return
    }

    // Find the transaction with that id
    const txn = Txns.findIndex(t => t.id === transactionId)

    // Report if the transaction wasn't found
    if (txn < 0) {
        res.status(400).json({ message: 'Transaction ID not found'})
        return
    }

    // Remove transaction from in-memory store
    Txns.splice(txn, 1)

    // Return list of all transactions
    return getAllTransactions(req, res)
}

export default {
    getAllTransactions,
    getTransaction,
    postTransaction,
    deleteTransaction,
}
