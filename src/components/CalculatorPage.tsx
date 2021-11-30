import React, { useEffect, useState } from 'react'
import incomeTaxApi from '../api/incomeTaxApi'
import { formatMoney } from '../utils/money'

interface Props {
}

const CalculatorPage: React.FC<Props> = (props) => {
    const [income, setIncome] = useState<number>(0);
    const [incomeTax, setIncomeTax] = useState<number>(0);

    const onIncomeChange = (str: string) => {
        if (!/^[0-9]*$/.test(str)) {
            return
        }

        const asNumber = str === '' ? 0 : parseInt(str)
        setIncome(asNumber)
    }

    useEffect(() => {
        incomeTaxApi.calculateIncomeTax(income).then(r => setIncomeTax(r))
    }, [income])

    return (
        <div>
            <div>Please enter your annual income ($):</div>
            <input value={income} onChange={(e) => onIncomeChange(e.currentTarget.value)} />

            <div>Your income is: {formatMoney(income)}</div>
            <div>You are paying {formatMoney(incomeTax)} in income tax</div>
        </div>
    );
}

export default CalculatorPage;
