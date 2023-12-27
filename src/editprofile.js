import { Component } from "react";
import {uploadPicture} from "./storage-helpers";
import {getTagUsers,updateProfile,createProfile,fetchProfile} from "./helpers";
import { Timestamp } from "firebase/firestore";
import Loading  from "./loading";
import BackWithHeader  from "./components/backheader";


class EditProfile extends Component{
    
    state = {email:this.props.email,profile:{},form:{}};
    saveprofileState = (profileData)=>{
        if(profileData==null){
            console.log('profileData:',profileData);
            this.createProfileIfNotFound();
        }
        this.setState({ profile:profileData,form:profileData },
            ()=>{
                console.log(this.state);
        });
    };
    fetchprofile = ()=>{
        fetchProfile(this.state.email, this.saveprofileState);

    }
    createProfileIfNotFound = ()=>{

        let timestamp = new Date().getTime();
        var data = {full_name:'',
        twitter:'',facebook:'',linkedin:'',
        tags:[],picture:null,city:'Lagos',
        email:this.state.email,friends:null,date_joined:timestamp, 
        instagram:'',phone:'',bio:'',phone_visibility:true,profile_visibility:true};
        createProfile(this.state.email,data,()=>{
            console.log(`new profile created for ${this.state.email}`);
        });
    }
    updateProfile = ()=>{
        updateProfile(this.state.email,this.state.form,()=>{
            // this.saveprofileState() 
            // .. doesn't return anything relies on realtime to update ui
        })
    }
    handleInput = (e)=>{
        var form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({form},()=>{console.log(this.state.form)});
    }
    uploadpicture = (e)=>{
        uploadPicture(e.target.files[0],'webuseremail',(downloadURL)=>{
            console.log('File available at:', downloadURL);
            var form = this.state.form;
            form['picture'] = downloadURL;
            this.setState({form},()=>{
                this.updateProfile(this.state.email,this.state.form,()=>{});
            });
            
        });
        alert('Profile picture will be automatically replaced');
    }
    componentDidMount(){
        this.fetchprofile();
    }
    render(){
        return (this.state.profile.full_name==null)?<><Loading/></>:<>
            <BackWithHeader title="Edit Profile"/>
            <div  className='center'>
           
        {/* <h1>Edit Profile</h1> */}
        <img src={this.state.profile.picture??'/regpix.png'} className="profilePageImage" />
        <br/>
        <input type="file" name="newprofileimage" onChange={this.uploadpicture} accept="image/*" />
        <br/>

        <br/>
        < a href="/changepassword">Change password</a>
        <br/>
        <label for="fullname">Full Name: </label> <br/>
        <input id="fullname" type="text" name="full_name" onChange={this.handleInput} value={this.state.form.full_name} />
        <br/>
        <label for="email">Email: </label> <br/>
        <input id="email" type="text" name="email" onChange={this.handleInput} value={this.state.form.email} />
        <br/>
        <label for="bio"> Bio : </label> <br/>
        <input id="bio" type="text" name="bio" onChange={this.handleInput} value={this.state.form.bio} />
        <br/>
        <label for="phone"> Phone Number: </label> <br/>
        <input id="phone" type="text" name="phone" onChange={this.handleInput} value={this.state.form.phone} />
        <br/>
        <label for="twitter"> Twitter : </label> <br/>
        <input id="twitter" type="text" name="twitter" onChange={this.handleInput} value={this.state.form.twitter} />
        <br/>
        <label for="instagram">  Instagram: </label> <br/>
        <input id="instagram" type="text" name="instagram" onChange={this.handleInput} value={this.state.form.instagram} />
        <br/>
        <label for="linkedin"> LinkedIn: </label> <br/>
        <input id="linkedin" type="text" name="linkedin" onChange={this.handleInput} value={this.state.form.linkedin} />
        <br/>
        <label for="facebook"> Facebook: </label> <br/>
        <input id="facebook" type="text" name="facebook" onChange={this.handleInput} value={this.state.form.facebook} />
        <br/>
        <button onClick={this.updateProfile}>Update Data</button>
        </div>
        </>
    }
}
export default EditProfile