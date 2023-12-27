import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail,updatePassword } from "firebase/auth";

const auth = getAuth();

export const signInWithGoogle = (callback,errorCallback)=>{
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    callback(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    errorCallback(email);
  });
}


export const createUser = (email, password,callback,errorCallback)=>{
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    callback(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    errorCallback(error);
    // ..
  });
}

export const signInUser = (email, password,callback,errorCallback)=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    callback(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    errorCallback(errorMessage);
  });
}

export const signOutUser = (callback,errorCallback)=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        callback();
      }).catch((error) => {
        // An error happened.
        errorCallback();
      });
}
export const sendPasswordReset = (email,callback,errorcallback)=>{
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    callback();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    errorcallback(error);
  });
}
export const changepassword = (newPassword,callback,errorCallback)=>{
  const user = auth.currentUser;

updatePassword(user, newPassword).then(() => {
  // Update successful.
  callback();
}).catch((error) => {
  // An error ocurred
  // ...
  errorCallback(error);
});

}