import { Component } from "react";
import {getTagUsers,addTag,removeTag,fetchProfile,fetchTrendingTags,tagMatch} from "./helpers";
class Dashboard extends Component{
    state = {email:this.props.email,trendingTags:[],profile:{},tag:'',tagUsers:[]};
    saveprofileStateAndGetTagsUser = (profileData)=>{
        this.setState({ profile:profileData },()=>{
            console.log(this.state);
            localStorage.setItem("email",profileData.email);
            getTagUsers(this.state.profile.tags,(users)=>{
                this.setState({tagUsers:users})
                console.log("Got tags users")});

        });
    };
    addTag = ()=>{
        addTag(this.state.email,this.state.tag,()=>{console.log(`Added ${this.state.tag} to tags`)});
        this.setState({tag:""});
        getTagUsers(this.state.profile.tags,()=>{console.log("Got tags users")});

        }
        addTagValue = (tag)=>{
            addTag(this.state.email,tag,()=>{console.log(`Added ${tag} to tags`)});
            this.setState({tag:""});
            getTagUsers(this.state.profile.tags,()=>{console.log("Got tags users")});
    
            }
    handleTag = (e)=>{
        this.setState({tag:e.target.value});
    }
    removeTag = (tag)=>{
        removeTag(this.state.email,tag,()=>{console.log(`Removed ${tag} from tags`)});
        getTagUsers(this.state.profile.tags,()=>{console.log("Got tags users")});
    
    }
     componentDidMount(){
        // fetchProfile('hallykola@gmail.com');
         fetchProfile(this.state.email, this.saveprofileStateAndGetTagsUser);
         fetchTrendingTags('lagos',(result)=>{
            this.setState({trendingTags:result.tags});
            console.log('trendingTags:',result.tags);
            
         });
    }
    render(){
        return <>
            <div  className='center'>

        <h1> Dashboard</h1>
        <h1>{this.state.profile.full_name}</h1>
        <h1>{this.state.profile.twitter}</h1>
        <h4>Trending Tags</h4>
        {
            this.state.trendingTags.map((value)=>{
                return <span className="trendingTags">
                    {value} <span onClick={()=>{this.addTagValue(value);}}>+ </span></span>
            })
        }
        <h4>My Tags</h4>

        {this.state.profile.tags?this.state.profile.tags.map((tag)=>{
            return <span className="activeTags">{tag} <span onClick={()=>{this.removeTag(tag);}}>X </span></span>;
        }):<p>No tags to show </p> }
        <br/><br/>
        <input type="text" name="tag" onChange={this.handleTag} value={this.state.tag} />
        <button onClick={this.addTag}> Add Tag</button>

        <div className="tagUsersList">
            <table>
               
           
        {   

            this.state.tagUsers.map((value)=>{
                return  <tr onClick={()=>{
                    window.location.href='/profile/' + value.email;
                }}
                >
                <td className="tablepix"><span ><img src={value.picture??'/regpix.png'} className="listImage" height="50vw"/></span></td>
                <td className="tablename"><span>{value.full_name}</span></td>
                <td className="tabletags"> <span>{
                tagMatch(this.state.profile.tags,value.tags).map((a)=>{
                    return <span className="matchingTags">{a}</span>
                })
                }</span></td>
                </tr>
            })
        }
         </table>
        </div>
        </div>
        </>
    }
}

export default Dashboard;