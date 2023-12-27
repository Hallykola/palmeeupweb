import { Component } from "react";
import { signInWithGoogle,signInUser ,createUser} from "./auth-helpers";
import { generateJWT } from "./jwt-helpers";
import { ToastContainer, toast } from 'react-toastify';
class Auth extends Component{

    state =  {form:{}};
    handleInput = (e)=>{
        var form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({form},()=>{console.log(this.state.form)});
    }
    mysignInWithGoogle =  ()=>{
        signInWithGoogle((user)=>{
            console.log('success:',user);
            generateJWT(user);
            window.location.href="/dashboard";
        },(error)=>{
            console.log('error:',error);

        })
    }
    mysignInUser =  ()=>{
        signInUser(this.state.form.email,this.state.form.password,(user)=>{
            console.log('success:',user);
            generateJWT(user);
            window.location.href="/dashboard";
        },(error)=>{
            alert(error);
            console.log('error:',error);

        })
    }

    mysignUp = ()=>{
        if(this.state.form.password!==this.state.form.confirmpassword){
            alert("Passwords don't match");
            return;
        }
        createUser(this.state.form.email, this.state.form.password,(user)=>{
            console.log('success:',user);
        },(error)=>{
            console.log('error:',error);
        })
    }
    render(){
        return <>
       
        <div class="center">
        <ToastContainer />
        <h1>Login Page</h1>
        <img src="./loginpix.png" height="400vh" alt="login"/><br/>
        <label for="email">Email: </label><br/>
        <input id="email" type="text" name="email" onChange={this.handleInput} value={this.state.form.email} />
        <br/>
        <label for="password"> Password: </label> <br/>
        <input id="password" type="password" name="password" onChange={this.handleInput} value={this.state.form.password} />
        <br/>
        < a href="/forgotpassword">Forgot password?</a>
        <br/><br/>
        <button className="loginButton" onClick={()=>{this.mysignInUser();}}>Login</button>
        <br/><br/>
        <button className="loginButton" onClick={this.mysignInWithGoogle}>Sign in with Google</button>
        <br/>
        < a href="/register">Don't have an account yet, Click to Register</a>
        <br/>
        {/* <p>Registration Form</p>

        <label for="fullname">Full Name: </label> <br/>
        <input id="fullname" type="text" name="full_name" onChange={this.handleInput} value={this.state.form.full_name} />
        <br/>
        <label for="email">Email: </label> <br/>
        <input id="email" type="text" name="email" onChange={this.handleInput} value={this.state.form.email} />
        <br/>
        
        <label for="phone"> Phone Number: </label> <br/>
        <input id="phone" type="text" name="phone" onChange={this.handleInput} value={this.state.form.phone} />
        <br/>
        <label for="password"> Password: </label> <br/>
        <input id="password" type="password" name="password" onChange={this.handleInput} value={this.state.form.password} />
        <br/>
        <label for="confirmpassword"> Confirm Password: </label> <br/>
        <input id="confirmpassword" type="password" name="confirmpassword" onChange={this.handleInput} value={this.state.form.confirmpassword} />
        <br/>
        <button onClick={this.mysignUp}>Register</button> */}
        </div>
        </>
    }
}

export default Auth;