import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBKtzeV9aP96azK1wWnUXmCRAUtLcmv8O0",
    authDomain: "whatsap-clone-be923.firebaseapp.com",
    projectId: "whatsap-clone-be923",
    storageBucket: "whatsap-clone-be923.appspot.com",
    messagingSenderId: "1025223861730",
    appId: "1:1025223861730:web:9576d25b7df65133e145bb",
    measurementId: "G-4Y28NLM34T"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth =firebase.auth();
  const provider =new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;