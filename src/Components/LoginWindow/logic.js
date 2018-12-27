import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.json';

firebase.initializeApp(firebaseConfig);

const signupErrorsMap = {
  'auth/email-already-in-use': 'There\'s already a user with such username',
  'auth/weak-password': 'Your password is too weak',
};

const loginErrorsMap = {
  'auth/user-disabled': 'You\'re disabled, sorry',
  'auth/user-not-found': 'Wrong username, check it please',
  'auth/wrong-password': 'Wrong password',
};

function convertUsernameToEmail(username) {
  return `${username}@gmail.com`;
}

function errorFromMapOrDefault(errorsMap, errorKey, defaultError) {
  if (Object.hasOwnProperty.call(errorsMap, errorKey)) {
    return new Error(errorsMap[errorKey]);
  }
  return new Error(defaultError);
}

async function signup(username, password) {
  const email = convertUsernameToEmail(username);
  try {
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch ({ code, message }) {
    const defaultError = `unknown firebase error: ${code} — ${message}`;
    throw errorFromMapOrDefault(signupErrorsMap, code, defaultError);
  }
}

async function login(username, password) {
  const email = convertUsernameToEmail(username);
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch ({ code, message }) {
    const defaultError = `unknown firebase error: ${code} — ${message}`;
    throw errorFromMapOrDefault(loginErrorsMap, code, defaultError);
  }
}

export { signup, login };
