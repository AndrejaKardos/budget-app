import React, { useEffect, useState } from 'react'
import incomeTaxApi from '../api/incomeTaxApi'
import useApiRequest from '../hooks/useApiRequest'
import { formatMoney } from '../utils/money'

interface Props {
}

const CalculatorPage: React.FC<Props> = (props) => {
    const [income, setIncome] = useState<number>(0);
    const [incomeTax, setIncomeTax] = useState<number>(0);
    const [paymentFrequency, setPaymentFrequency] = useState<number>(1);

    const { send: sendIncomeTaxCalcRequest, ...incomeTaxCalcState } = useApiRequest<number, number>(incomeTaxApi.calculateIncomeTax)

    const onIncomeChange = (str: string) => {
        if (!/^[0-9]*$/.test(str)) {
            return
        }

        const asNumber = str === '' ? 0 : parseInt(str)
        setIncome(asNumber)
    }

    useEffect(() => {
        sendIncomeTaxCalcRequest(income).then(r => setIncomeTax(r))
    }, [sendIncomeTaxCalcRequest, income])

    return (
        <div>
            <div>Please enter your annual income ($):</div>
            <input value={income} onChange={(e) => onIncomeChange(e.currentTarget.value)} />

            <select value={paymentFrequency} onChange={(e) => setPaymentFrequency(parseInt(e.currentTarget.value))}>
              <option value={1}>annually</option>
              <option value={12}>monthly</option>
              <option value={52}>weekly</option>
            </select>

            <div>Your income is: {formatMoney(income)}</div>

            { incomeTaxCalcState.isLoading && <div>We are calculating your income tax...</div>}
            { incomeTaxCalcState.isOk && 
              <>
                <div>You are paying {formatMoney(incomeTax)} in income tax</div>
                <div>You are receiving {formatMoney(income - incomeTax)} income after tax</div>
                <div>You are receiving {formatMoney((income - incomeTax)/paymentFrequency)} income per payment period</div>
              </>
            }
        </div>
    );
}

export default CalculatorPage;
