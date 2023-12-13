// import React, { useState } from 'react';
// import { fetchWordDefinition } from '../api/freeDictionary';

// const DictionarySearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [definition, setDefinition] = useState('');

//   const search = async () => {
//     try {
//       const data = await fetchWordDefinition(searchTerm);
//       setDefinition(data); 
//     } catch (error) {
//       console.error('Error:', error);
//       setDefinition(null); // reset
//     }
//   };

//   return (
//     <div className="search-container my-10">
//       <input 
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Type a word"
//         className="input w-full mb-4"
//       />
//       <button onClick={search} className="button">Search</button>
//       <div className="definition">
//         {definition && (
//           <div>
//             <h2 className="text-2xl font-bold my-2">{definition.word}</h2>
//             <p>{definition.meanings[0].definitions[0].definition}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DictionarySearch;

import React, { useState } from 'react';
import { fetchWordDefinition } from '../api/freeDictionary';

const StarFilled = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const StarOutline = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const DictionarySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const addToHistory = (word) => {
    const currentHistory = JSON.parse(localStorage.getItem('history')) || [];
    const updatedHistory = Array.from(new Set([word, ...currentHistory]));
    localStorage.setItem('history', JSON.stringify(updatedHistory));
  };

  const toggleFavorite = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const word = wordData.word;

    if (currentFavorites.includes(word)) {
      const newFavorites = currentFavorites.filter(fav => fav !== word);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));  // using local storage for favorite functionality
      setIsFavorite(false);
    } else {
      const newFavorites = [...currentFavorites, word];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };

  const search = async () => {
    setError('');
    setIsFavorite(false); // reset favorite status on new search
    if (!searchTerm) {
      setError('Please enter a word to search.');
      return;
    }

    try {
      const data = await fetchWordDefinition(searchTerm);
      if (data.length > 0) {
        const firstMeaning = data[0].meanings[0];
        const definition = firstMeaning.definitions[0];
        const wordInfo = {
          word: data[0].word,
          phonetic: data[0].phonetics[0]?.text || '',
          origin: data[0].origin || '🤷🏾❓',
          definition: definition.definition,
          example: definition.example || '',
          synonyms: definition.synonyms || [],
          audioUrl: data[0].phonetics?.find(phonetic => phonetic.audio)?.audio || ''
        };
        setWordData(wordInfo);
        addToHistory(searchTerm);

        // check if the word is a favorite
        const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || []; 
        setIsFavorite(currentFavorites.includes(searchTerm));
      } else {
        setWordData(null);
        setError(`No results found for "${searchTerm}".`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch the definition. Please try again.');
      setWordData(null);
    }
  };

  return (
    <div className="search-container my-10">
      <input 
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type a word"
        className="input w-full mb-4"
      />
      <button onClick={search} className="button">Search</button>
      {error && <p className="text-red-500">{error}</p>}
      {wordData && (
        <div className="definition text-center p-8">
          <h2 className="text-2xl font-bold my-2">
            {wordData.word}
            <button onClick={toggleFavorite} className="ml-2">
              {isFavorite ? <StarFilled /> : <StarOutline />}
            </button>
          </h2>
          <p>Pronunciation: {wordData.phonetic}</p>
          <p>Origin: {wordData.origin}</p>
          {wordData.audioUrl && (
            <div className="flex justify-center my-2">
              <audio controls src={wordData.audioUrl}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          <p>Definition: {wordData.definition}</p>
          {wordData.example && <p>Example Sentence: {wordData.example}</p>}
          {wordData.synonyms.length > 0 && <p>Synonyms: {wordData.synonyms.join(', ')}</p>}
        </div>
      )}
    </div>
  );
};

export default DictionarySearch;


