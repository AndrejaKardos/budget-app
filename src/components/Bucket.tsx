import React from "react";
import { formatMoney } from "../utils/money";

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
      <div>{formatMoney((income * percentage) / 100)}</div>
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
