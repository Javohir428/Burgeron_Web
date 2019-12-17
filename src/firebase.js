import Firebase from 'firebase'
import 'firebase/database'

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyClwCFfkCZjbsvFsEWYqw8RS7RBEUB25vQ",
    authDomain: "burgeron-81696.firebaseapp.com",
    databaseURL: "https://burgeron-81696.firebaseio.com",
    projectId: "burgeron-81696",
    storageBucket: "burgeron-81696.appspot.com",
    messagingSenderId: "31305328357",
    appId: "1:31305328357:web:711ff3933d57159804960c",
    measurementId: "G-FP513PSK31"
})

export const db = firebaseApp.database()