import { Component } from 'react';
import {getTagUsers,addTag,removeTag,fetchProfile} from "./helpers";


class Profile extends Component{
    state = {profile:{}};

    email = window.location.pathname.split('/')[2]??''; //this.props.email; //
    saveProfileToState = (profile)=>{
        this.setState({profile})
    }
    componentDidMount(){
        console.log(this.email);
        if(this.email!==''){
            fetchProfile(this.email,this.saveProfileToState);
        }
    }

    render(){
        return <>
            <div  className='center'>

        <h1>Profile</h1>
        {/* <p>{(this.state.profile.email!==null)&&this.state.profile.picture }</p> */}
        {(this.state.profile.picture !== null) && <img className='profileImage' src={this.state.profile.picture} alt='profile' height='300vh' />}
        <br/>
        {this.state.profile.tags?this.state.profile.tags.map((tag)=>{
            return <span className="activeTags">{tag} 
            {/* <span onClick={()=>{this.removeTag(tag);}}>X </span> */}
            </span>;
        }):<p>No tags to show </p> }
        <p>Full name: {(this.state.profile.email!==null)&&this.state.profile.full_name }</p>
        <p>Bio: {(this.state.profile.email!==null)&&this.state.profile.bio }</p>
        <p>Email: {(this.state.profile.email!==null)&&this.state.profile.email }</p>
        <p>Phone: {(this.state.profile.phone_visibility)&&this.state.profile.phone }</p>
        <p>Twitter: {(this.state.profile.email!==null)&&this.state.profile.twitter }</p>
        <p>Instagram: {(this.state.profile.email!==null)&&this.state.profile.instagram }</p>
        <p>LinkedIn: {(this.state.profile.email!==null)&&this.state.profile.linkedin }</p>
        <p>Facebook: {(this.state.profile.email!==null)&&this.state.profile.facebook }</p>
        <p>Date Joined: {(this.state.profile.email!==null)&&this.state.profile.date_joined }</p>
        <a href={'/chat/'+ this.state.profile.email} >Chat with {this.state.profile.full_name}</a>
        </div>
        </>
    }
}

export default Profile;