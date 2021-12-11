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
  return (
    <div>
      <input
        value={name}
        onChange={(e) => onNameChange(e.currentTarget.value)}
      />
      <input
        value={(income * percentage) / 100}
        onChange={(e) => {
          if (income === 0) {
            return;
          }
          const parsedValue = parseInt(e.currentTarget.value) || 0;
          const newPercentage = (parsedValue / income) * 100;
          onPercentageChange(newPercentage);
        }}
      />
      <input
        value={percentage}
        onChange={(e) =>
          onPercentageChange(parseInt(e.currentTarget.value) || 0)
        }
      />
      <button onClick={() => onBucketDelete()}>Delete Bucket</button>
    </div>
  );
};

export default Bucket;
