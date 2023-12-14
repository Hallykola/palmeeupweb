import { Component } from "react";
import { doc,setDoc, arrayUnion, updateDoc,collection, query, where, onSnapshot,getFirestore,addDoc,orderBy, arrayRemove } from "firebase/firestore";
import { app } from "./firebase";

const updateProfile = (email,data,callback)=>{
    const db = getFirestore(app);
    const mydoc = doc(db, "users", email);
    setDoc(mydoc,data);
    callback();
}
const addTag = (email,tag,callback)=>{
    const db = getFirestore(app);
    const mydoc = doc(db, "users", email);
    // console.log('Here in update');

    updateDoc(mydoc,{tags:arrayUnion(tag)});
    callback();
}
const removeTag = (email,tag,callback)=>{
    const db = getFirestore(app);
    const mydoc = doc(db, "users", email);
    updateDoc(mydoc,{tags:arrayRemove(tag)});
    callback();
}
const fetchProfile = (email,mycallback)=>{
    const db = getFirestore(app);
    // const profilesCollection = collection(db, 'users');

    const mydoc = doc(db, "users", email);

    onSnapshot(mydoc, (querySnapshot) => {
        
        console.log(querySnapshot.data());
        mycallback(querySnapshot.data());
        // this.setState({ profiles });
      });
    // const q = query(profilesCollection, where("email", "==", email),orderBy("timeStamp", "desc"),);

    // onSnapshot(q, (querySnapshot) => {
    //     const profiles = [];
    //     querySnapshot.forEach((doc) => {
    //       profiles.push(doc.data());
    //     });
    //     profiles.sort((a,b)=> b.timeStamp - a.timeStamp);
    //     console.log(profiles);
    //     // this.setState({ profiles });
    //   });
}
class Dashboard extends Component{
    state = {email:'hallykola@gmail.com',profile:{},tag:''};
    saveprofileState = (profileData)=>{this.setState({ profile:profileData },()=>{console.log(this.state)});};
    addTag = ()=>{
        addTag(this.state.email,this.state.tag,()=>{console.log(`Added ${this.state.tag} to tags`)});
        this.setState({tag:""});
        }
    handleTag = (e)=>{
        this.setState({tag:e.target.value});
    }
    removeTag = (tag)=>{
        removeTag(this.state.email,tag,()=>{console.log(`Removed ${tag} from tags`)});
        }
     componentDidMount(){
        // fetchProfile('hallykola@gmail.com');
         fetchProfile(this.state.email,this.saveprofileState);
    }
    render(){
        return <>
        <h1> Dashboard</h1>
        <p>Here is the dashboard</p>
        <h1>{this.state.profile.full_name}</h1>
        <h1>{this.state.profile.twitter}</h1>
        {this.state.profile.tags?this.state.profile.tags.map((tag)=>{
            return <p>{tag} <span onClick={()=>{this.removeTag(tag);}}>X </span></p>;
        }):<p>No tags to show </p> }
        <input type="text" name="tag" onChange={this.handleTag} />
        <button onClick={this.addTag}> Add Tag</button>
        </>
    }
}

export default Dashboard;