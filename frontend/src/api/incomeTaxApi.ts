import axios from 'axios'

const incomeTaxApi = {
  calculateIncomeTax: (income: number): Promise<number> => {
    // TODO: Error handling
    // TODO: Abstract the host name
    return axios.get('http://localhost:3001/incomeTax', { params: { income }})
      .then(response => {
        return response.data.incomeTaxPaid as number
      })
  }
};

export default incomeTaxApi;
