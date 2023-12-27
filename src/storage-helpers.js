import { getStorage, ref, uploadBytes,getDownloadURL  } from "firebase/storage";
import { app } from "./firebase";

// Create a root reference
const storage = getStorage(app);

export const uploadPicture= (file,email,callback)=>{
// Create a reference to 'images/mountains.jpg'
const profileImageRef = ref(storage, `images/${email}.jpg`);
// 'file' comes from the Blob or File API
uploadBytes(profileImageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
        var url = downloadURL;
        callback(url);
      });
  })
}

// // While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 