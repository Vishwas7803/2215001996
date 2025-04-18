import React, { useState } from 'react';
const mockApiResponse = {
  p: [2, 3, 5, 7, 11],
  f: [55, 89, 144,233, 377 , 610,987, 1597 , 2584, 4181, 6765],
  e: [ 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 50, 52, 54, 56],
  r: [24, 17,27 , 30, 21, 14, 10, 23]
};

const WINDOW_SIZE = 10;

function App() {
  const [storedNumbers, setStoredNumbers] = useState([]);
  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');

  const fetchNumbers = (numberId) => {
    setError('');
    const numbers = mockApiResponse[numberId];

    if (!numbers) {
      setError('Invalid number ID');
      return;
    }

    const uniqueNumbers = [...new Set([...storedNumbers, ...numbers])];
    const newStoredNumbers = uniqueNumbers.slice(-WINDOW_SIZE);
    setStoredNumbers(newStoredNumbers);
    if (newStoredNumbers.length === WINDOW_SIZE) {
      const avg = newStoredNumbers.reduce((sum, num) => sum + num, 0) / WINDOW_SIZE;
      setAverage(avg);
    } else {
      setAverage(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Average Calculator</h1>
      <div>
        <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
        <button onClick={() => fetchNumbers('f')}>Fetch Fibonacci Numbers</button>
        <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
        <button onClick={() => fetchNumbers('r')}>Fetch Random Numbers</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Numbers:</h2>
      <p>{storedNumbers.join(', ')}</p>
      <h2>Average:</h2>
      <p>{average !== null ? average.toFixed(2) : 'Not enough numbers'}</p>
    </div>
  );
}

export default App;