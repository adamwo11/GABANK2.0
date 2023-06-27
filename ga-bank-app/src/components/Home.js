import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ users }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [first4, setFirst4] = useState('');
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    // fetch the users and cards data when the component mounts
    fetchUserCards();
  }, []);

  const navigate = useNavigate();

  const fetchUserCards = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3002/usercards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Received user cards:', responseData);
        const { cards } = responseData;
        setUserCards(cards);
      } else if (response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access');
      } else {
        console.error('Failed to fetch user cards');
      }
    } catch (error) {
      console.error('Error fetching user cards:', error);
    }
  };

  const addCard = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3002/usercards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: users.id,
          cardType: cardName,
          cardPin: cardNumber,
          firstFourNumbers: first4,
          balance: 0,
        }),
      });

      if (response.ok) {
        // Card added successfully
        console.log('Card added successfully');
        const responseData = await response.json(); // Parse the response JSON
        console.log('Added Card:', responseData.card);
        fetchUserCards(); // Fetch updated card data after adding a new card
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error adding card:', errorData.error);
      }
    } catch (error) {
      console.error('Error adding card:', error);
    }

    // Clear the input fields
    setCardNumber('');
    setCardName('');
    setFirst4('');
  };

  const navigateToATM = async (id) => {
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
        console.log('ATM Data:', atmData);
        navigate(`/atm/${id}`);
      } else {
        console.error('Failed to fetch ATM data');
      }
    } catch (error) {
      console.error('Error fetching ATM data:', error);
    }
  };
  return (
    <div>
      {users && users.id ? (
        <div>
          <h1>Welcome, {users.name}!</h1>
          <h3>Add a Card</h3>
            <div>
              <label>Card Name:</label>
              <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
        </div>
          <div>
            <label>Card Pin Number:</label>
            <input
              type="number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>First 4 digits:</label>
            <input
              type="number"
              value={first4}
              onChange={(e) => setFirst4(e.target.value)}
              required
            />
          </div>
          <button onClick={addCard}>Add Card</button>
          <h3>Your Cards:</h3>
          {userCards.length > 0 ? (
            <ul>
              {userCards.map((cardData) => (
                <li key={cardData.id}>
                  <div>Card Type: {cardData.cardtype}</div>
                  <div>Card Pin: {cardData.cardpin}</div>
                  <div>First Four Digits: {cardData.firstfournumbers}</div>
                  <div>Balance: {cardData.balance}</div>
                  <div>
                    <button onClick={() => navigateToATM(cardData.id)}>$</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No cards found.</p>
          )}
          </div>
      ) : (
        <h1>Welcome, Guest!</h1>
      )}
    </div>
  );
};

export default Home;
