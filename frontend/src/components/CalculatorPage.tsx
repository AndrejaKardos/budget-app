import React, { useEffect, useState } from "react";
import incomeTaxApi from "../api/incomeTaxApi";
import useApiRequest from "../hooks/useApiRequest";
import { formatMoney } from "../utils/money";
import Bucket from "./Bucket";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
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

  const { send: sendIncomeTaxCalcRequest, ...incomeTaxCalcState } =
    useApiRequest<number, number>(incomeTaxApi.calculateIncomeTax);

  useEffect(() => {
    sendIncomeTaxCalcRequest(income).then((r) => setIncomeTax(r));
  }, [sendIncomeTaxCalcRequest, income]);

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
      <InputGroup className="calculator-page__input-group">
        <InputGroup.Text>$</InputGroup.Text>
        <FormControl
          value={income}
          onChange={(e) => setIncome(parseInt(e.currentTarget.value) || 0)}
        />
        <DropdownButton title={paymentFrequency.name} variant="outline-primary">
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
      </InputGroup>

      <div>Your income is: {formatMoney(income)}</div>

      {incomeTaxCalcState.isLoading && (
        <div>We are calculating your income tax...</div>
      )}
      {incomeTaxCalcState.isOk && (
        <>
          <div>You are paying {formatMoney(incomeTax)} in income tax</div>
          <div>
            You are receiving {formatMoney(income - incomeTax - medicareLevy)}{" "}
            income after tax
          </div>
          <div>
            {`You are receiving ${formatMoney(incomePerPayPeriod)} income ${
              paymentFrequency.name
            }`}
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
          onClick={() =>
            setBuckets([...buckets, { name: "Bucket", percentage: 0 }])
          }
          variant="success"
        >
          Add Bucket
        </Button>
      }
    </div>
  );
};

export default CalculatorPage;