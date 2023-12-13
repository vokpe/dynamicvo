import axios from 'axios';

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const RANDOM_WORD_URL = 'https://random-word-api.herokuapp.com/word';

export const fetchWordDefinition = async (word) => {
  const response = await axios.get(`${BASE_URL}/${word}`);
  return response.data;
};

// just get a random word
export const fetchWordOfTheDay = async () => {
  const word = 'apple'; 
  return fetchWordDefinition(word);
};

// searching the dictionary
export const searchDictionary = async (query) => {
  return fetchWordDefinition(query);
};

// fetching the user's history/favorites
export const fetchHistoryFavorites = async () => {
  // for now return a static response or fetch from local storage
  const items = JSON.parse(localStorage.getItem('favorites')) || [];
  return items;
};

export const fetchRandomWord = async () => {
  const response = await axios.get(RANDOM_WORD_URL);
  return response.data[0]; 
};
