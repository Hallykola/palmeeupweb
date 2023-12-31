import { Component } from "react";
import { signInWithGoogle,signInUser ,createUser} from "./auth-helpers";
import { ToastContainer, toast } from 'react-toastify';
import { createProfile,fetchProfile,myGetTimeStamp } from "./helpers";
import { generateJWT } from "./jwt-helpers";



class Registration extends Component{

    state =  {form:{timestamp:myGetTimeStamp()}};
    handleInput = (e)=>{
        var form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({form},()=>{console.log(this.state.form)});
    }
    mysignInWithGoogle =  ()=>{
        signInWithGoogle((user)=>{
            console.log('success:',user);
        },(error)=>{
            console.log('error:',error);

        })
    }
    mysignInUser =  ()=>{
        signInUser(this.state.form.email,this.state.form.password,(user)=>{
            console.log('success:',user);
        },(error)=>{
            console.log('error:',error);

        })
    }

    mysignUp = async (e)=>{
        e.preventDefault();
        if(this.state.form.password!==this.state.form.confirmpassword){
            alert("Passwords don't match");
            return;
        }
        createUser(this.state.form.email, this.state.form.password,async(user)=>{
            console.log('success:',user);
            await createProfile(this.state.form,()=>{});
                generateJWT(user);
                window.location.href="/dashboard";
        },(error)=>{
            var mssg = error.message.replace('Firebase: Error (auth/','').replace(')','');
            toast(mssg);
            console.log('error:',error);
        })
    }
    render(){
        return <>
            <div  className='center'>
        <h1>Register</h1>
        <ToastContainer/>
        <form onSubmit={this.mysignUp} >
        <img src="./regpix.png" height="300vh" alt="login"/><br/>
        <label for="fullname">Full Name: </label> <br/>
        <input id="fullname" type="text" name="full_name" onChange={this.handleInput} value={this.state.form.full_name} required />
        <br/>
        <label for="email">Email: </label> <br/>
        <input id="email" type="text" name="email" onChange={this.handleInput} value={this.state.form.email} required/>
        <br/>
        
        <label for="phone"> Phone Number: </label> <br/>
        <input id="phone" type="text" name="phone" onChange={this.handleInput} value={this.state.form.phone} required/>
        <br/>
        <label for="password"> Password: </label> <br/>
        <input id="password" type="password" name="password" onChange={this.handleInput} value={this.state.form.password} required/>
        <br/>
        <label for="confirmpassword"> Confirm Password: </label> <br/>
        <input id="confirmpassword" type="password" name="confirmpassword" onChange={this.handleInput} value={this.state.form.confirmpassword} required/>
        <br/><br/>
        <input type='submit' className="loginButton"  value={"Register"}/>
        <br/>
        <br/>
        < a href="/login">Already have an account, Click to Log in</a>
        <br/>
        </form>
        <button onClick={()=>{
        console.log('form details:',this.state.form);
        fetchProfile(this.state.form.email,()=>{});}}>Test</button>
        
        </div>
        
        </>
    }
}

export default Registration;