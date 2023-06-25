import React, { useState, useEffect } from 'react';

const ATMPage = ({ match }) => {
  const [card, setCard] = useState(null);
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  useEffect(() => {
    // Fetch the card data based on the card ID from the URL parameter
    fetchCard(match.params.cardId);
  }, [match.params.cardId]);

  const fetchCard = async (cardId) => {
    try {
      // Retrieve the JWT token from the storage
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3002/atm/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setCard(responseData.card);
        setBalance(responseData.card.balance);
      } else if (response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access');
      } else {
        console.error('Failed to fetch card');
      }
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      // Perform the withdraw operation
      const newBalance = balance - parseInt(withdrawAmount);

      // Retrieve the JWT token from the storage
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3002/atm/${card.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ balance: newBalance }),
      });

      if (response.ok) {
        // Update the balance in the state
        setBalance(newBalance);
        setWithdrawAmount('');
        console.log('Withdraw successful');
      } else if (response.status === 401) {
        // Handle unauthorized access
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
      // Perform the deposit operation
      const newBalance = balance + parseInt(depositAmount);

      // Retrieve the JWT token from the storage
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3002/atm/${card.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ balance: newBalance }),
      });

      if (response.ok) {
        // Update the balance in the state
        setBalance(newBalance);
        setDepositAmount('');
        console.log('Deposit successful');
      } else if (response.status === 401) {
        // Handle unauthorized access
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
      // Retrieve the JWT token from the storage
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3002/atm/${card.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setBalance(responseData.card.balance);
      } else if (response.status === 401) {
        // Handle unauthorized access
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
          <div>Card Type: {card.cardtype}</div>
          <div>Card Pin: {card.cardpin}</div>
          <div>First Four Digits: {card.firstfournumbers}</div>
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
        </div>
      ) : (
        <p>Loading card...</p>
      )}
    </div>
  );
};

export default ATMPage;
