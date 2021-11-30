import React, { useEffect, useState } from 'react'
import incomeTaxApi from '../api/incomeTaxApi'
import { ApiStatus } from '../utils/api'
import { formatMoney } from '../utils/money'

interface Props {
}

const CalculatorPage: React.FC<Props> = (props) => {
    const [income, setIncome] = useState<number>(0);
    const [incomeTax, setIncomeTax] = useState<number>(0);
    const [incomeTaxState, setIncomeTaxState] = useState<ApiStatus>(ApiStatus.OK);

    const onIncomeChange = (str: string) => {
        if (!/^[0-9]*$/.test(str)) {
            return
        }

        const asNumber = str === '' ? 0 : parseInt(str)
        setIncome(asNumber)
    }

    useEffect(() => {
        setIncomeTaxState(ApiStatus.LOADING)
        incomeTaxApi.calculateIncomeTax(income).then(r => {
            setIncomeTax(r)
            setIncomeTaxState(ApiStatus.OK)
        })
    }, [income])

    return (
        <div>
            <div>Please enter your annual income ($):</div>
            <input value={income} onChange={(e) => onIncomeChange(e.currentTarget.value)} />

            <div>Your income is: {formatMoney(income)}</div>

            { incomeTaxState === ApiStatus.LOADING && <div>We are calculating your income tax...</div>}
            { incomeTaxState === ApiStatus.OK && <div>You are paying {formatMoney(incomeTax)} in income tax</div>}
        </div>
    );
}

export default CalculatorPage;
