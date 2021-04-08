import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA1JJx9qxY8KQsDrmTQB2_7JtJ7gnzpnDo",
    authDomain: "bolun-de8fc.firebaseapp.com",
    projectId: "bolun-de8fc",
    storageBucket: "bolun-de8fc.appspot.com",
    messagingSenderId: "169455965453",
    appId: "1:169455965453:web:4cfefe3488eac416154c44"
  };


const app = !firebase.apps.length ? 
            firebase.initializeApp(firebaseConfig)
            :firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db , auth , provider }