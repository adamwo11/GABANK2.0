import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ATMPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  useEffect(() => {
    console.log('bark')
    // Fetch card data based on the provided id
    fetchCardData();
  }, []);

  const fetchCardData = async () => {
    console.log('woof')
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

  const handleWithdraw = async () => {
    try {
      const newBalance = balance - parseInt(withdrawAmount);
      const response = await fetch(`http://localhost:3002/atm/${id}/withdraw`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: withdrawAmount }),
      });

      if (response.ok) {
        setBalance(newBalance);
        setWithdrawAmount('');
        console.log('Withdraw successful');
      } else if (response.status === 401) {
        console.error('Unauthorized access');
      } else {
        console.error('Failed to withdraw');
      }
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  const handleDeposit = async () => {
    try {
      const newBalance = balance + parseInt(depositAmount);
      const response = await fetch(`http://localhost:3002/atm/${id}/deposit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: depositAmount }),
      });

      if (response.ok) {
        setBalance(newBalance);
        setDepositAmount('');
        console.log('Deposit successful');
      } else if (response.status === 401) {
        console.error('Unauthorized access');
      } else {
        console.error('Failed to deposit');
      }
    } catch (error) {
      console.error('Error depositing:', error);
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
          <h3>Withdraw</h3>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            required
          />
          <button onClick={handleWithdraw}>Withdraw</button>
          <h3>Deposit</h3>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            required
          />
          <button onClick={handleDeposit}>Deposit</button>
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
