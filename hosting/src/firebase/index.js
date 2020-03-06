import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from './config'

export const firebaseApp = firebase.initializeApp(firebaseConfig)
