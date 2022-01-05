import { Request, Response } from 'express'

const calculateIncomeTax = (req: Request, res: Response) => {
    // Extract query string parameter
    const { income: incomeStr } = req.query

    // Validate input
    const income = parseInt(incomeStr as string)
    if (isNaN(income)) {
        res.status(400).json({ message: 'Invalid or missing income'})
    }

    let incomeTaxPaid: number;
    if (income <= 18200) {
      incomeTaxPaid = 0;
    } else if (income <= 45000) {
      incomeTaxPaid = (income - 18200) * 0.19;
    } else if (income <= 120000) {
      incomeTaxPaid = 5092 + (income - 45000) * 0.325;
    } else if (income <= 180000) {
      incomeTaxPaid = 29467 + (income - 120000) * 0.37;
    } else {
      incomeTaxPaid = 51667 + (income - 180000) * 0.45;
    }

    res.json({ incomeTaxPaid })
}

export default {
    calculateIncomeTax
}