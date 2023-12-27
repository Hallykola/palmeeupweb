import { Component } from "react";

class BackWithHeader extends Component{
    goBackToDash = ()=>{
        window.location.href = '/dashboard'
    }
    render(){
        return <>
        <div>
        <i class="fa fa-arrow-circle-left backicon" onClick={this.goBackToDash} ></i>
        <h1 className="backtitle">{this.props.title}</h1>
        </div>
        </>
    }
}

export default BackWithHeader;