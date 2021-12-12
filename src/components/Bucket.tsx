import React from "react";

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
    <div>
      <input
        value={name}
        onChange={(e) => onNameChange(e.currentTarget.value)}
      />
      <input
        value={Math.round(income * percentage) / 100}
        onChange={(e) =>
          onBucketIncomeChange(parseInt(e.currentTarget.value) || 0)
        }
      />
      <input
        value={Math.round(percentage * 100) / 100}
        onChange={(e) =>
          onPercentageChange(parseInt(e.currentTarget.value) || 0)
        }
      />
      <button onClick={() => onBucketDelete()}>Delete Bucket</button>
    </div>
  );
};

export default Bucket;
