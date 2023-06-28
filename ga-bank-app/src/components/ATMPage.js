import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/ATMPage.css';

const ATMPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const heading = {
    textAlign: 'left',
  }
  const fetchCardData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/atm/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const atmData = await response.json();
        setCard(atmData);
        setBalance(atmData.balance);
      } else if (response.status === 404) {
        console.error('Card not found');
      } else {
        console.error('Failed to fetch card data');
      }
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchCardData();
  }, [fetchCardData]);

  const handleNumberClick = (number) => {
    if (number === '.') {
      if (!amount.includes('.')) {
        setAmount((prevAmount) => prevAmount + '.');
      }
    } else {
      setAmount((prevAmount) => prevAmount + number);
    }
  };

  const handleWithdrawal = async () => {
    try {
      const token = localStorage.getItem('token');
      const parsedAmount = parseFloat(amount); // Parse amount to a number
  
      // Check if the withdrawal amount exceeds the current balance
      if (parsedAmount > balance) {
        console.error('Insufficient balance');
        return;
      }
  
      const response = await fetch(`http://localhost:3002/atm/${id}/withdraw`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parsedAmount.toFixed(2) }), // Use parsedAmount and fix decimal places
      });
  
      if (response.ok) {
        const transactionData = await response.json();
        console.log('Withdrawal successful:', transactionData);
        fetchCardData(); // Fetch updated card data after the withdrawal
      } else {
        const errorData = await response.json();
        console.error('Error during withdrawal:', errorData.error);
      }
    } catch (error) {
      console.error('Error during withdrawal:', error);
    }
    handleClearAmount();
  };

  const handleDeposit = async () => {
    try {
      const token = localStorage.getItem('token');
      const parsedAmount = parseFloat(amount); // Parse amount to a number
      const response = await fetch(`http://localhost:3002/atm/${id}/deposit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parsedAmount.toFixed(2) }), // Use parsedAmount and fix decimal places
      });

      if (response.ok) {
        const transactionData = await response.json();
        console.log('Deposit successful:', transactionData);
        fetchCardData(); // Fetch updated card data after the deposit
      } else {
        const errorData = await response.json();
        console.error('Error during deposit:', errorData.error);
      }
    } catch (error) {
      console.error('Error during deposit:', error);
    }
    handleClearAmount();
  };

  
  const handleClearAmount = () => {
    setAmount('');
  };
  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div className="atm-container">
      {card ? (
        <div className="atm">
          <h1 className="atm-heading">GA BANK</h1>
          <h1 className="atm-title">ATM</h1>
          <div className="card-details">
            <h3 className="card-details-heading">Card Details</h3>
            <div className="card-type">Card Type: {card.cardType}</div>
            <div className="balance">Balance: ${parseFloat(balance).toFixed(2)}</div>
          </div>
          <h3 className="transaction-heading">Withdraw / Deposit</h3>
          <button className="clear-amount-button" onClick={handleClearAmount}>
            Clear Amount
          </button>
          <div className="amount-display">${amount}</div>
          <div className="transaction-buttons">
            <button className="withdraw-button" onClick={handleWithdrawal}>
              Withdraw
            </button>
            <button className="deposit-button" onClick={handleDeposit}>
              Deposit
            </button>
          </div>
          <div className="number-buttons">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
              <button
                key={number}
                className="number-button"
                onClick={() => handleNumberClick(number)}
              >
                {number}
              </button>
            ))}
            <button
              className="decimal-button"
              onClick={() => handleNumberClick('.')}
            >
              .
            </button>
          </div>
          <button className="go-back-button" onClick={handleGoBack}>
            Go back to Cards
          </button>
        </div>
      ) : (
        <p>Loading card...</p>
      )}
    </div>
  );
};

export default ATMPage;
