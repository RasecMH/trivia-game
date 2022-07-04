const SAVED_RANKING_KEY = 'ranking';

if (!JSON.parse(localStorage.getItem(SAVED_RANKING_KEY))) {
  localStorage.setItem(SAVED_RANKING_KEY, JSON.stringify([]));
}
const readSavedRanking = () => JSON.parse(localStorage.getItem(SAVED_RANKING_KEY)) || [];

const savedRankings = (SavedItems) => localStorage
  .setItem(SAVED_RANKING_KEY, JSON.stringify(SavedItems));

// --------------------------------------------------------------------
// Esse codigo foi copiado do projeto trybetunes e é de autoria da trybe.
// --------------------------------------------------------------------

export const getSavedRankings = () => {
  const SavedItems = readSavedRanking();
  return SavedItems;
};

export const addInRanking = (Item) => {
  if (Item) {
    const SavedItems = readSavedRanking();
    console.log(SavedItems);
    savedRankings([...SavedItems, Item]);
  }
};
