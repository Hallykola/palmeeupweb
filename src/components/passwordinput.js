import { Component } from "react";

class MyPasswordInput extends Component{
    state = {inputType:'password',capitalclass:'invalid',letterclass:'invalid', numberclass:'invalid',lengthclass:'invalid'};
    
    toggleShowPassword = ()=>{
      if(this.state.inputType==='password'){
       var inputType='text'
        this.setState({inputType});
      }else{
       var inputType='password'
        this.setState({inputType});
      }

    }

  

// When the user clicks on the password field, show the message box
myonfocus = ()=>{
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myonblur = ()=>{
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
handleValidation = (e)=>{
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(e.target.value.match(lowerCaseLetters)) {
    var letterclass = "valid";
    this.setState({letterclass});
    
  } else {
    var letterclass = "invalid";
    this.setState({letterclass});
}

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(e.target.value.match(upperCaseLetters)) {
    var capitalclass = "valid";
    this.setState({capitalclass});
   
  } else {
    var capitalclass = "invalid";
    this.setState({capitalclass});
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(e.target.value.match(numbers)) {
    var numberclass = "valid";
    this.setState({numberclass});
  } else {
    var numberclass = "invalid";
    this.setState({numberclass});
  }

  // Validate length
  if(e.target.value.length >= 8) {
    var lengthclass = "valid";
    this.setState({lengthclass});
  } else {
    var lengthclass = "invalid";
    this.setState({lengthclass});
  }
}
    render(){
        return <>
         { (this.props.validate??true) &&     <input type={this.state.inputType} className={this.props.className} onBlur={this.myonblur} onFocus={this.myonfocus} onChange={(e)=>{this.props.onChange(e);this.handleValidation(e);}} name={this.props.name}  id={this.props.id} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>}

         { (!(this.props.validate??true)) && <input type={this.state.inputType} className={this.props.className}  onChange={(e)=>{this.props.onChange(e);}} name={this.props.name}  id={this.props.id}   required/>}
                  <input type="checkbox" name="showpassword" id="showpassword" onClick={this.toggleShowPassword}/> Show password
                  <br/>
                  <div id="message">
  <h6>Password must contain the following:</h6>
  <p id="letter" class={this.state.letterclass}>A <b>lowercase</b> letter</p>
  <p id="capital" class={this.state.capitalclass}>A <b>capital (uppercase)</b> letter</p>
  <p id="number" class={this.state.numberclass}>A <b>number</b></p>
  <p id="length" class={this.state.lengthclass}>Minimum <b>8 characters</b></p>
</div>
        </>
    }
}
export default MyPasswordInput;