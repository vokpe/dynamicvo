// import React, { useState, useEffect } from 'react';
// import { fetchWordDefinition, fetchRandomWord } from '../api/freeDictionary';

// const WordOfTheDay = () => {
//   const [wordData, setWordData] = useState(null);

//   useEffect(() => {
//     // get a random word
//     fetchRandomWord()
//       .then(randomWord => {
//         // then get definition of the word
//         return fetchWordDefinition(randomWord);
//       })
//       .then(definitionData => {
//         if (definitionData.length > 0) {
//           // set the first definition data from the response
//           setWordData(definitionData[0]);
//         } else {
//           // the definition data is empty
//           console.error('No definition found for the word.');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching word:', error);
//       });
//   }, []);

//   if (!wordData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="text-center p-8">
//       <h1 className="text-3xl font-bold mb-2">{wordData.word}</h1>
//       <p>{wordData.meanings[0].definitions[0].definition}</p>
//       {/* Render more details as needed */}
//     </div>
//   );
// };

// export default WordOfTheDay;

import React, { useState, useEffect } from 'react';
import { fetchWordDefinition, fetchRandomWord } from '../api/freeDictionary';


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

const WordOfTheDay = () => {
  const [wordData, setWordData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchRandomWord()
      .then(randomWord => fetchWordDefinition(randomWord))
      .then(definitionData => {
        if (definitionData.length > 0) {
          setWordData(definitionData[0]);

          // check if the word is already in favorites
          const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
          setIsFavorite(currentFavorites.includes(definitionData[0].word));
        } else {
          console.error('No definition found for the word.');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching word:', error);
        setIsLoading(false);
      });
  }, []);

  const toggleFavorite = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const word = wordData.word;

    if (currentFavorites.includes(word)) {
      // remove the word from favorites
      const newFavorites = currentFavorites.filter(fav => fav !== word);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // add the word to favorites
      const newFavorites = [...currentFavorites, word];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!wordData) {
    return <div className="text-center p-8">No word data available. Refresh page!</div>;
  }

  const { phonetics, meanings, origin } = wordData;
  const audioUrl = phonetics?.find(phonetic => phonetic.audio)?.audio;
  const firstMeaning = meanings[0].definitions[0];
  const synonyms = firstMeaning.synonyms.join(', ');
  const example = firstMeaning.example;

  return (
    <div className="text-center p-8 always">
      <h1 className="text-3xl font-bold mb-2">{wordData.word}</h1>
      <p className="text-lg">{phonetics[0]?.text || " "}</p>
      <p className="text-md">Origin: {origin || "🤷🏾❓"}</p>
      {audioUrl && (
        <div className="flex justify-center my-2">
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <p className="text-md">Definition: {firstMeaning.definition}</p>
      {example && <p className="text-md">Example Sentence: {example}</p>}
      {synonyms && <p className="text-md">Synonyms: {synonyms}</p>}
      <button onClick={toggleFavorite}>
        {isFavorite ? <StarFilled /> : <StarOutline />}
      </button>
    </div>
  );
};

export default WordOfTheDay;






