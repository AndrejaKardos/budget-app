import React, { useState } from 'react'

const Calculator = () => {
const[income, setIncome] = useState("")

const onChange = (event) => {
  const re = /^[0-9\b]+$/
  if (event.target.value === '' || re.test(event.target.value)) {
     setIncome({value: event.target.value})
  }
}

console.log(income)

return (
  <div>
    <h3>Budget Calculator</h3>
    <div>
      <label>Annual income: </label>
        <input type="text" pattern="/^[0-9\b]+$/" onChange={onChange} />
        <input type="submit" />
    </div>
  </div>
)
}


export default Calculator;