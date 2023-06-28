import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/ExchangeRates.css';

const ExchangeRates = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('AUD');
  const [dollarAmount, setDollarAmount] = useState(0);

  const exchangeRates = {
    USD: 0.85,
    EUR: 0.85,
    GBP: 0.72,
    JPY: 110.2,
    AUD: 1.00,
    GHS: 5.88,
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleDollarAmountChange = (event) => {
    setDollarAmount(event.target.value);
  };

  const convertCurrency = () => {
    const selectedRate = exchangeRates[selectedCurrency];
    const convertedAmount = dollarAmount * selectedRate;
    return convertedAmount.toFixed(2);
  };

  return (
    <div className="exchange-container">
      <h1 className="exchange-heading">GA BANK</h1>
      <h1 className="exchange-title">Exchange Rates</h1>
      <div className="select-container">
        <label htmlFor="currency-select">Select a currency:</label>
        <select id="currency-select" value={selectedCurrency} onChange={handleCurrencyChange}>
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="amount-container">
        <label htmlFor="dollar-input">Enter dollar amount:</label>
        <input
          id="dollar-input"
          type="number"
          value={dollarAmount}
          onChange={handleDollarAmountChange}
        />
      </div>
      <h3 className="exchange-rate-heading">Exchange Rate for {selectedCurrency}:</h3>
      <p className="exchange-rate">{exchangeRates[selectedCurrency]}</p>
      <h3 className="converted-amount-heading">Converted Amount:</h3>
      <p className="converted-amount">{convertCurrency()}</p>
      <Link to="/home" className="home-link">
        <button className="home-button">Go back to Home</button>
      </Link>
    </div>
  );
};

export default ExchangeRates;
