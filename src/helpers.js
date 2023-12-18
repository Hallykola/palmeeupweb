import { doc,setDoc, arrayUnion, updateDoc,collection, query, where, onSnapshot,getFirestore,addDoc,orderBy, arrayRemove } from "firebase/firestore";
import { app } from "./firebase";

export const updateProfile = (email,data,callback)=>{
    const db = getFirestore(app);
    const mydoc = doc(db, "users", email);
    setDoc(mydoc,data);
    callback();
}
export const createProfile = (email,data,callback)=>{
    const db = getFirestore(app);
    // const profilesCollection = collection(db, 'users');

    const mydoc = doc(db, "users", email);
    setDoc(mydoc,data);
    callback();
}
export const addTag = (email,tag,callback)=>{
    const db = getFirestore(app);
    const mydoc = doc(db, "users", email);
    // console.log('Here in update');

    updateDoc(mydoc,{tags:arrayUnion(tag)});
    callback();
}
export const removeTag = (email,tag,callback)=>{
    const db = getFirestore(app);
    const mydoc = doc(db, "users", email);
    updateDoc(mydoc,{tags:arrayRemove(tag)});
    callback();
}
export const getTagUsers = (tagArray,callback)=>{
    if(tagArray.length<1){
        callback([]);
        return;
    }
    const db = getFirestore(app);
    const profilesCollection = collection(db, 'users');
     const q = query(profilesCollection, where("tags", 'array-contains-any', tagArray),orderBy("full_name", "desc"),);

    onSnapshot(q, (querySnapshot) => {
        const profiles = [];
        querySnapshot.forEach((doc) => {
          profiles.push(doc.data());
        });
        // profiles.sort((a,b)=> b.timeStamp - a.timeStamp);
        console.log(profiles);
        callback(profiles);
      });
}
export const fetchProfile = async (email,mycallback)=>{
    const db = getFirestore(app);

    const mydoc = doc(db, "users", email);

    onSnapshot(mydoc, (querySnapshot) => {
        
        console.log(querySnapshot.data());
        mycallback(querySnapshot.data());
      });
   
}

export const fetchTrendingTags = async (location,mycallback)=>{
    const db = getFirestore(app);

    const mydoc = doc(db, "trending", location);

    onSnapshot(mydoc, (querySnapshot) => {
        
        console.log(querySnapshot.data());
        mycallback(querySnapshot.data());
      });
   
}
export const tagMatch = (mine,user)=>{
    var result = [];
    result = user.filter((value)=>{
        return mine.includes(value);
    });
    return result;

}