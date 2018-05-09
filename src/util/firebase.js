import firebase from "firebase";

const config = {
    apiKey: "AIzaSyBGl-R4-VdRbCEKN267t7qWzzmAhhAk-mQ",
    authDomain: "design-research-tool-89324.firebaseapp.com",
    databaseURL: "https://design-research-tool-89324.firebaseio.com",
    projectId: "design-research-tool-89324",
    storageBucket: "",
    messagingSenderId: "285822123662"
};

firebase.initializeApp(config);

export default firebase;

// lets also export the services we need from firebase
// beyond just the firebase instance
export const database = firebase.database();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
