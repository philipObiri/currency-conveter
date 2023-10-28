import {useEffect, useState} from "react";

export default function App() {
  const[amount, setAmount] = useState(1);
  const[ fromCurrency, setFromCurrency]=useState("USD");
  const [toCurrency, setToCurrency]= useState("EUR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect( function(){
    async function convertMoney(){
      const controller = new AbortController();
      setIsLoading(true);
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`, {signal: controller.signal});
      const data = await response.json();
      setConverted(data.rates[toCurrency]);
      setIsLoading(false);
    };

  
  if(amount === 0){
    return
  }
  else if( toCurrency === fromCurrency){
    return setConverted(amount);
   }
   convertMoney();
  }, 
  
  [amount, fromCurrency, toCurrency]);

  return (
    <div className="container">
      <h1>Welcome to Paylio.You Number One Currency Converter! </h1>

   
      <input type="text" 
      id="amount"
       value={amount} 
       onChange={(event)=> setAmount(Number(event.target.value))} 
       disabled= {isLoading} />
     

      <select value={fromCurrency}
       onChange={(event)=>setFromCurrency(event.target.value)}
       disabled= {isLoading}  >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select value={toCurrency} 
      onChange={(event)=>setToCurrency(event.target.value)}
      disabled= {isLoading}  >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      
       { isLoading? <Loader/>:
        <p>Amount : {converted} {toCurrency}</p>}
    </div>
  );
}


function Loader(){
  return (
    <p>Loading .....</p>
  )
}