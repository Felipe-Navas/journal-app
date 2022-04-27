import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCSRIp2xVK_udyV8JehX2NvgNPVNREL2-A',
  authDomain: 'react-app-cursos-fb244.firebaseapp.com',
  projectId: 'react-app-cursos-fb244',
  storageBucket: 'react-app-cursos-fb244.appspot.com',
  messagingSenderId: '800934734752',
  appId: '1:800934734752:web:32dfef8187a3c64f3752c5',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
