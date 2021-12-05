import React, { useState } from "react";
import { formatMoney } from "../utils/money";

interface Props {
  name: string;
  income: number;
  defaultPercentage?: number;
}

const Bucket: React.FC<Props> = ({ name, income, defaultPercentage }) => {
  const [percentage, setPercentage] = useState<number>(defaultPercentage || 0);
  return (
    <div>
      <div>{name}</div>
      <div>{formatMoney((income * percentage) / 100)}</div>
      <input
        value={percentage}
        onChange={(e) => setPercentage(parseInt(e.currentTarget.value) || 0)}
      />
    </div>
  );
};

export default Bucket;
