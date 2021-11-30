
const incomeTaxApi = {
    calculateIncomeTax: (income: number):Promise<number> => {
        let incomeTaxPaid;
        if (income <= 18200) {
            incomeTaxPaid = 0;
        } else if (income <= 45000) {
            incomeTaxPaid = (income - 18200) * 0.19
        } else if (income <= 120000) {
            incomeTaxPaid = 5092 + (income - 45000) * 0.325
        } else if (income <= 180000) {
            incomeTaxPaid = 29467 + (income - 120000) * 0.37
        } else {
            incomeTaxPaid = 51667 + (income - 180000) * 0.45
        }
        return Promise.resolve(incomeTaxPaid);
    }
}

export default incomeTaxApi