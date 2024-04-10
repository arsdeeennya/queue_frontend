import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';

export const CreditCardForm = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <div>
      <Cards number={number} name={name} expiry={expiry} cvc={cvc} />
      <form>
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          onChange={e => setNumber(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          name="expiry"
          placeholder="Expiry"
          onChange={e => setExpiry(e.target.value)}
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          onChange={e => setCvc(e.target.value)}
        />
      </form>
    </div>
  );
};
