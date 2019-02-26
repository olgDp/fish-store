import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCj6lIDzW6gVxaz9Z_j_BgJZ0_RjnWaINc",
  authDomain: "catch-of-the-day-9902e.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-9902e.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
