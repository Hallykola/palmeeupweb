import { Component } from "react";
import {sendPasswordReset} from "./auth-helpers";

class ForgotPassword extends Component{
    state = {form:{}};

    handleInput = (e)=>{
        var form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({form},()=>{console.log(this.state.form)});
    }
    mySendPasswordReset = ()=>{
        sendPasswordReset(this.state.form.email,()=>{
            alert('Password Reset Email Sent');
            window.location.href="/login"
        },()=>{});
    }
    render(){
        return <>
            <div  class='centerCenter'>
        <h1>Forgot Password</h1>
       
        <label for="email">Email: </label> <br/>
        <input id="email" type="text" name="email" onChange={this.handleInput} value={this.state.form.email} />
        <br/>
        <br/><br/>
        <button className="loginButton" onClick={()=>{this.mySendPasswordReset()}}>Send Reset Email</button>
        <br/>
       
        </div></>
    }
}
export default ForgotPassword;