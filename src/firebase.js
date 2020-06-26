const firebase = require('firebase');
require('firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyC5xX8vlw3-6PEulVbWkhOweMuweOuJ368",
    authDomain: "editor-12d24.firebaseapp.com",
    databaseURL: "https://editor-12d24.firebaseio.com",
    projectId: "editor-12d24",
    storageBucket: "editor-12d24.appspot.com",
    messagingSenderId: "489973557521",
    appId: "1:489973557521:web:bf4b79ee20bc11ddeec4b0",
    measurementId: "G-5Y9PE6ZEWF"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase