  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyDAM2xab3Lrq8wKW6Xw6qqMR285DoO6VOQ",
  authDomain: "project-burnout-aee19.firebaseapp.com",
  databaseURL: "https://project-burnout-aee19-default-rtdb.firebaseio.com",
  projectId: "project-burnout-aee19",
  storageBucket: "project-burnout-aee19.appspot.com",
  messagingSenderId: "92397089772",
  appId: "1:92397089772:web:ceec63cc41186f8ece46c9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();

sighUp.addEventListener('click',(e) => {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     // Signed in 
      const user = userCredential.user;

      set(ref(database, 'users/' + user.uid),{
          password: password,
          email: email
      })

      alert('Login Successful!');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    // ..
    });

});

 login.addEventListener('click',(e)=>{
   var email = document.getElementById('email').value;
   var password = document.getElementById('password').value;

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        const dt = new Date();
         update(ref(database, 'users/' + user.uid),{
          last_login: dt,
        })

         alert('User logged in!');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
  });

 });

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    //bla bla bla
    // ...
  } else {
    // User is signed out
    // ...
    //bla bla bla
  }
});

addEventListener('click',(e)=>{

   signOut(auth).then(() => {
     // Sign-out successful.
     alert('user logged out');
   }).catch((error) => {
     // An error happened.
     const errorCode = error.code;
     const errorMessage = error.message;

        alert(errorMessage);
   });

});