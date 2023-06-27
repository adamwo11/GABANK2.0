import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ATMPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [operation, setOperation] = useState('');

  useEffect(() => {
    // Fetch card data based on the provided id
    fetchCardData();
  }, []);

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

  const handleNumberClick = (number) => {
    setAmount((prevAmount) => prevAmount + number);
  };

  const handleTransaction = async () => {
    try {
      const newBalance = operation === 'withdraw' ? balance - parseInt(amount) : balance + parseInt(amount);
      const response = await fetch(`http://localhost:3002/atm/${id}/${operation}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (response.ok) {
        setBalance(newBalance);
        setAmount('');
        console.log(`${operation.charAt(0).toUpperCase() + operation.slice(1)} successful`);
      } else if (response.status === 401) {
        console.error('Unauthorized access');
      } else {
        console.error(`Failed to ${operation}`);
      }
    } catch (error) {
      console.error(`Error ${operation}ing:`, error);
    }
  };

  const handleCheckBalance = async () => {
    try {
      const response = await fetch(`http://localhost:3002/atm/${id}/balance`);

      if (response.ok) {
        const responseData = await response.json();
        setBalance(responseData.balance);
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
          <div>Balance: {balance}</div>
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
