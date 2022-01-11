import axios from "axios";

interface Transaction {
  id: string;
  description: string;
  amountCents: number;
}

const transactionApi = {
  getAllTransactions: (): Promise<Transaction[]> => {
    return axios.get("http://localhost:3001/transactions").then((response) => {
      return response.data as Transaction[];
    });
  },
};

export default transactionApi;
