import { Component } from "react";
import {changepassword} from "./auth-helpers";
import MyPasswordInput from "./components/passwordinput";

class ChangePassword extends Component{
    state = {form:{}};

    handleInput = (e)=>{
        var form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({form},()=>{console.log(this.state.form)});
    }
    myChangePassword = ()=>{
        if(this.state.form.password!==this.state.form.confirmpassword){
            alert('Passwords do not match');
            return;
        }
        changepassword(this.state.form.password,()=>{
            alert('Password changed');
            window.location.href="/dashboard";
        },(error)=>{
            console.log('see',error);
            alert(error.message);
        });
    }

    render(){
        return <>
            <div  className='centerCenter'>
        <h1>Change Password</h1>
        
        <label for="password"> Password: </label> <br/>
        <input id="password" type="password" name="password" onChange={this.handleInput} value={this.state.form.password} />
        {/* <MypasswordInput className="form-control mb-3" onChange={this.handleinput} name='passwordagain' id="inputPassword4" /> */}

        <br/>
        <label for="confirmpassword"> Confirm Password: </label> <br/>
        <input id="confirmpassword" type="password" name="confirmpassword" onChange={this.handleInput} value={this.state.form.confirmpassword} />
        <br/><br/>
        <button className="loginButton" onClick={this.myChangePassword}>Change Password</button>
        <br/>
       
        </div></>
    }
}
export default ChangePassword;