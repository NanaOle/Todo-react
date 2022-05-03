// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// this is the key to our backend

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyARTSmW_-LlCaEQfOHwyQhzingPD8mp8mY',
  authDomain: 'todo-app-9aceb.firebaseapp.com',
  projectId: 'todo-app-9aceb',
  storageBucket: 'todo-app-9aceb.appspot.com',
  messagingSenderId: '268806039750',
  appId: '1:268806039750:web:49f08eaa639411f2484fc7',
  measurementId: 'G-0L62YH2DCQ',
}

// init firebase app
const app = initializeApp(firebaseConfig)

// init service
const db = getFirestore(app)

export default db
