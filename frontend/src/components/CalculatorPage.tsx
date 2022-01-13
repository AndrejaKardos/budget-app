import React, { useEffect, useState } from "react";
import incomeTaxApi from "../api/incomeTaxApi";
import useApiRequest from "../hooks/useApiRequest";
import transactionApi from "../api/transactionApi";
import { formatMoney } from "../utils/money";
import Bucket from "./Bucket";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Table,
} from "react-bootstrap";
import "./CalculatorPage.scss";

interface PaymentFrequencyOption {
  name: string;
  paymentsPerYear: number;
}

const paymentFrequencyOptions: PaymentFrequencyOption[] = [
  { name: "annually", paymentsPerYear: 1 },
  { name: "monthly", paymentsPerYear: 12 },
  { name: "fortnightly", paymentsPerYear: 26 },
  { name: "weekly", paymentsPerYear: 52 },
];

interface BucketState {
  name: string;
  percentage: number;
}

interface Transaction {
  id: string;
  description: string;
  amountCents: number;
}

interface Props {}

const CalculatorPage: React.FC<Props> = (props) => {
  const [income, setIncome] = useState<number>(0);
  const [incomeTax, setIncomeTax] = useState<number>(0);
  const [paymentFrequency, setPaymentFrequency] =
    useState<PaymentFrequencyOption>(paymentFrequencyOptions[0]);
  const [buckets, setBuckets] = useState<BucketState[]>([
    { name: "Fire Extinguisher", percentage: 20 },
    { name: "Splurge", percentage: 15 },
    { name: "Smile", percentage: 10 },
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  const { send: sendIncomeTaxCalcRequest, ...incomeTaxCalcState } =
    useApiRequest<number, number>(incomeTaxApi.calculateIncomeTax);

  useEffect(() => {
    sendIncomeTaxCalcRequest(income).then((r) => setIncomeTax(r));
  }, [sendIncomeTaxCalcRequest, income]);

  const { send: sendGetAllTransactions, ...getAllTransactionsState } =
    useApiRequest<void, Transaction[]>(transactionApi.getAllTransactions);

  useEffect(() => {
    sendGetAllTransactions()
      .then((r) => setTransactions(r))
      .catch(() => {});
  }, [sendGetAllTransactions]);

  const changeBucketPercentage = (bucketIndex: number, percentage: number) => {
    if (bucketIndex < 0 || bucketIndex >= buckets.length) {
      return;
    }

    const bucketCopy = { ...buckets[bucketIndex], percentage };
    const newBuckets = [...buckets];
    newBuckets[bucketIndex] = bucketCopy;

    setBuckets(newBuckets);
  };

  const changeBucketName = (bucketIndex: number, name: string) => {
    const bucketCopy = { ...buckets[bucketIndex], name };
    const newBuckets = [...buckets];
    newBuckets[bucketIndex] = bucketCopy;

    setBuckets(newBuckets);
  };

  const removeBucket = (bucket: BucketState) => {
    const newBuckets = [...buckets].filter((b) => b !== bucket);

    setBuckets(newBuckets);
  };

  const medicareLevy = income * 0.02;

  const incomePerPayPeriod =
    (income - incomeTax - medicareLevy) / paymentFrequency.paymentsPerYear;

  return (
    <div className="calculator-page">
      <div>Please enter your annual income:</div>
      <div className="calculator-page__input-container">
        <InputGroup className="calculator-page__input-group">
          <InputGroup.Text>$</InputGroup.Text>
          <FormControl
            className="calculator-page__input-container"
            value={income}
            onChange={(e) => setIncome(parseInt(e.currentTarget.value) || 0)}
          />
        </InputGroup>
      </div>

      <div>Your income is: {formatMoney(income)}</div>

      {incomeTaxCalcState.isLoading && (
        <div>We are calculating your income tax...</div>
      )}
      {incomeTaxCalcState.isOk && (
        <>
          <div>
            You are paying {formatMoney(incomeTax)} in income tax annually
          </div>
          <div>
            You are receiving {formatMoney(income - incomeTax - medicareLevy)}{" "}
            annual income after tax
          </div>
          <div className="calculator-page__income">
            {`You are receiving ${formatMoney(incomePerPayPeriod)} income `}
            <DropdownButton
              className="calculator-page__income--dropdown"
              title={paymentFrequency.name}
              variant="outline-primary"
            >
              {paymentFrequencyOptions.map((pfo) => (
                <Dropdown.Item
                  onClick={() => setPaymentFrequency(pfo)}
                  key={pfo.paymentsPerYear}
                  active={pfo === paymentFrequency}
                >
                  {pfo.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </>
      )}

      <hr />

      <div className="calculator-page__bucket-container">
        <div className="calculator-page__bucket-group">
          {buckets.map((bucket, index) => (
            <Bucket
              name={bucket.name}
              income={incomePerPayPeriod}
              percentage={bucket.percentage}
              onPercentageChange={(percentage: number) =>
                changeBucketPercentage(index, percentage)
              }
              onNameChange={(name: string) => changeBucketName(index, name)}
              onBucketDelete={() => removeBucket(bucket)}
              key={index}
            />
          ))}
        </div>
      </div>
      {
        <Button
          className="calculator-page__add-button"
          onClick={() =>
            setBuckets([...buckets, { name: "Bucket", percentage: 0 }])
          }
          variant="success"
        >
          Add Bucket
        </Button>
      }
      {transactions && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>ID</td>
              <td>Description</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((r) => (
              <tr>
                <td>{r.id}</td>
                <td>{r.description}</td>
                <td>${r.amountCents / 100}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CalculatorPage;
