export const firebaseConfig = {
  apiKey: process.env['REACT_APP_FIREBASE_API_KEY'],
  authDomain: process.env['REACT_APP_FIREBASE_AUTH_DOMAIN'],
  databaseURL: process.env['REACT_APP_FIREBASE_DATABASE_URL'],
  projectId: process.env['REACT_APP_FIREBASE_PROJECT_ID'],
  // storageBucket: "",
  // messagingSenderId: ""
}

export const actionCodeSettings = {
  url: 'https://tomakako.web.app/callback/signup',
  handleCodeInApp: true,
  // dynamicLinkDomain: 'tomakako.firebaseapp.com'
}