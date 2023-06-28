import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ATMPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  const fetchCardData = async () => {
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
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const handleNumberClick = (number) => {
    setAmount((prevAmount) => prevAmount + number);
  };

  const handleTransaction = async (transactionType) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/atm/${id}/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ transactionType }),
      });
  
      if (response.ok) {
        const transactionData = await response.json();
        console.log('Transaction successful:', transactionData);
        fetchCardData(); // Fetch updated card data after the transaction
      } else {
        const errorData = await response.json();
        console.error('Error during transaction:', errorData.error);
      }
    } catch (error) {
      console.error('Error during transaction:', error);
    }
  };

  const handleCheckBalance = async () => {
    try {
      const response = await fetch(`http://localhost:3002/atm/${id}/balance`);

      if (response.ok) {
        const responseData = await response.json();
        setBalance(responseData.balance.toFixed(2));
        localStorage.setItem('balance', responseData.balance.toFixed(2));
      } else if (response.status === 401) {
        console.error('Unauthorized access');
      } else {
        console.error('Failed to check balance');
      }
    } catch (error) {
      console.error('Error checking balance:', error);
    }
  };

  return (
    <div>
      {card ? (
        <div>
          <h1>ATM</h1>
          <h3>Card Details</h3>
          <div>Card Type: {card.cardType}</div>
          <div>Balance: {parseFloat(balance).toFixed(2)}</div>
          <h3>Withdraw / Deposit</h3>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <div>
            <button onClick={() => handleTransaction('withdraw')}>Withdraw</button>
            <button onClick={() => handleTransaction('deposit')}>Deposit</button>
          </div>
          <div>
            <button onClick={() => handleNumberClick(1)}>1</button>
            <button onClick={() => handleNumberClick(2)}>2</button>
            <button onClick={() => handleNumberClick(3)}>3</button>
            <button onClick={() => handleNumberClick(4)}>4</button>
            <button onClick={() => handleNumberClick(5)}>5</button>
            <button onClick={() => handleNumberClick(6)}>6</button>
            <button onClick={() => handleNumberClick(7)}>7</button>
            <button onClick={() => handleNumberClick(8)}>8</button>
            <button onClick={() => handleNumberClick(9)}>9</button>
            <button onClick={() => handleNumberClick(0)}>0</button>
          </div>
          <h3>Check Balance</h3>
          <button onClick={handleCheckBalance}>Check Balance</button>
          <Link to="/home">Go back to Cards</Link>
        </div>
      ) : (
        <p>Loading card...</p>
      )}
    </div>
  );
};

export default ATMPage;
