import React from "react";
import { formatMoney } from "../utils/money";

interface Props {
  name: string;
  income: number;
  percentage: number;
  onPercentageChange: (percentage: number) => void;
}

const Bucket: React.FC<Props> = ({
  name,
  income,
  percentage,
  onPercentageChange,
}) => {
  return (
    <div>
      <div>{name}</div>
      <div>{formatMoney((income * percentage) / 100)}</div>
      <input
        value={percentage}
        onChange={(e) =>
          onPercentageChange(parseInt(e.currentTarget.value) || 0)
        }
      />
    </div>
  );
};

export default Bucket;
