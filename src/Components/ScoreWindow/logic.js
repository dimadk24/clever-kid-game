import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../../firebaseConfig';

if (firebase.apps && !firebase.apps.length) firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
database.settings({ timestampsInSnapshots: true });


async function saveUserScore(name, score) {
  await database.collection('users').doc(name).set({ name, score });
}

async function getScores() {
  const scores = [];
  const querySnapshot = await database.collection('users').get();
  querySnapshot.forEach(doc => scores.push({ ...doc.data(), id: doc.id }));
  return scores;
}

function updateLocalScore(scores, { id, name, score }) {
  const NOT_FOUND = -1;
  const localScores = scores.slice();
  const indexOfFoundScore = scores.findIndex(item => item.id === id);
  if (indexOfFoundScore === NOT_FOUND) localScores.push({ id, name, score });
  else localScores[indexOfFoundScore] = { id, name, score };
  return localScores;
}

function sortScores(scores) {
  return scores.sort((left, right) => right.score - left.score);
}

export {
  updateLocalScore,
  sortScores,
  saveUserScore,
  getScores,
};
