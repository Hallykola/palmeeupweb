import { doc,setDoc, arrayUnion, updateDoc,collection, query, where, onSnapshot,getFirestore,addDoc,orderBy, arrayRemove } from "firebase/firestore";
import { app } from "./firebase";

export const myGetTimeStamp = ()=>{
    return new Date().getTime();
}
export const updateProfile = (email,data,callback)=>{
    const db = getFirestore(app);
    const mydoc = doc(db, "users", email);
    setDoc(mydoc,data);
    callback();
}
export const createProfile = (data,callback)=>{
    const db = getFirestore(app);
    // const profilesCollection = collection(db, 'users');

    const mydoc = doc(db, "users", data.email);
    setDoc(mydoc,
        {full_name:data.full_name,
        twitter:'',facebook:'',linkedin:'',
        tags:[],picture:null,city:'Lagos',
        email:data.email,friends:null,date_joined:data.timestamp??'', 
        instagram:'',phone:data.phone,bio:'',phone_visibility:true,profile_visibility:true}
        );
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

    onSnapshot(mydoc, async(querySnapshot) => {
        
        
        if(querySnapshot.data()==null){
            await createProfileIfNotFound(email);
            // fetchProfile(email,mycallback);
        }else{
            console.log(querySnapshot.data());
            mycallback(querySnapshot.data());
        }
        
      });
   
}
export const createProfileIfNotFound = (email)=>{

    let timestamp = myGetTimeStamp();
    var data = {full_name:'',
    twitter:'',facebook:'',linkedin:'',
    tags:[],picture:null,city:'Lagos',
    email:email,friends:null,date_joined:timestamp, 
    instagram:'',phone:'',bio:'',phone_visibility:true,profile_visibility:true};
    createProfile(data,()=>{
        console.log(`new profile created for ${email}`);
    });
}

export const fetchTrendingTags = async (location,mycallback)=>{
    const db = getFirestore(app);

    const mydoc = doc(db, "trending", location);

    onSnapshot(mydoc, (querySnapshot) => {
        
        console.log(querySnapshot.data());
        if(querySnapshot.data!==null){
            mycallback(querySnapshot.data());
        }
      });
   
}
export const tagMatch = (mine,user)=>{
    var result = [];
    result = user.filter((value)=>{
        return mine.includes(value);
    });
    return result;

}