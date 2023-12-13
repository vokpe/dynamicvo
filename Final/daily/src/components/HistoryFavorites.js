// import React, { useEffect, useState } from 'react';

// const HistoryFavorites = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     // fetch the history and favorites from local storage or an API endpoint
//     const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    
//     setFavorites(savedFavorites);
//     setHistory(savedHistory);
//   }, []);

//   return (
//     <div>
//       <div className="favorites history-list">
//         <h2 className="text-2xl font-bold mb-4">Favorites</h2>
//         <ul>
//           {favorites.map((favorite, index) => (
//             <li key={index} className="list-disc ml-6">{favorite}</li>
//           ))}
//         </ul>
//       </div>
//       <div className="history history-list">
//         <h2 className="text-2xl font-bold mb-4">History</h2>
//         <ul>
//           {history.map((item, index) => (
//             <li key={index} className="list-disc ml-6">{item}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default HistoryFavorites;

import React, { useEffect, useState } from 'react';

const HistoryFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setFavorites(savedFavorites);
    setHistory(savedHistory);
  };

  useEffect(() => {
    loadHistory();

    // set event listener for local storage changes
    const handleStorageChange = () => {
      loadHistory();
    };

    window.addEventListener('storage', handleStorageChange);

    // clean event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <div className="favorites history-list">
        <h2 className="text-2xl font-bold mb-4">Favorites</h2>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index} className="">{favorite}</li>
          ))}
        </ul>
      </div>
      <div className="history history-list">
        <h2 className="text-2xl font-bold mb-4">History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index} className="">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryFavorites;
