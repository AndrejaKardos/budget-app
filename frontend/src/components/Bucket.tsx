import React from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import "./Bucket.scss";

interface Props {
  name: string;
  income: number;
  percentage: number;
  onPercentageChange: (percentage: number) => void;
  onNameChange: (name: string) => void;
  onBucketDelete: () => void;
}

const Bucket: React.FC<Props> = ({
  name,
  income,
  percentage,
  onPercentageChange,
  onBucketDelete,
  onNameChange,
}) => {
  const onBucketIncomeChange = (bucketIncome: number) => {
    if (income === 0) {
      return;
    }
    const newPercentage = (bucketIncome / income) * 100;
    onPercentageChange(newPercentage);
  };

  return (
    <Card className="bucket">
      <Card.Body className="bucket__body bucket__group--margin">
        <Card.Title className="bucket__title">
          <FormControl
            value={name}
            onChange={(e) => onNameChange(e.currentTarget.value)}
          />
        </Card.Title>
        <InputGroup className="bucket__group--margin">
          <InputGroup.Text>$</InputGroup.Text>
          <FormControl
            value={Math.round(income * percentage) / 100}
            onChange={(e) =>
              onBucketIncomeChange(parseInt(e.currentTarget.value) || 0)
            }
          />
        </InputGroup>
        <InputGroup className="bucket__group--margin bucket__group--align">
          <div className="bucket__percentage-container">
            <FormControl
              className="bucket__text-percentage"
              value={Math.round(percentage * 100) / 100}
              onChange={(e) =>
                onPercentageChange(parseInt(e.currentTarget.value) || 0)
              }
            />
          </div>
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        <InputGroup className="bucket__button-group">
          <Button variant="outline-danger" onClick={() => onBucketDelete()}>
            Delete Bucket
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default Bucket;
