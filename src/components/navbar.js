import React, { Component } from 'react';

class Navbar extends Component {
    state = {  } 

    handlelogout = ()=>{
        localStorage.removeItem('uid');
        // localStorage.removeItem('qwrgggsdfg');
        window.location.href = '/';
       
      
     }
    render() { 
        return (
            <nav className="navbar navbar-expand-lg bg-light fixed-top navbar-light mb-5">
            <div class="container">
                <a href="/" className="navbar-brand text-success fw-bold">Pal Mee Up</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul class="navbar-nav ms-auto">
                        <li className="nav-item">
                            {(localStorage.getItem('token')==null) &&  <a href="/" className="nav-link text-info fw-bold">Home </a>}
                        </li>
                        <li className="nav-item">

                            {(localStorage.getItem('qwrgggsdfg')!='nana' && (localStorage.getItem('qwrgggsdfg')!=null)) &&  <a href="/studentdashboard" className="nav-link text-info fw-bold">Dashboard</a>}
                        </li>
                        <li className="nav-item">

                            {(localStorage.getItem('qwrgggsdfg')!='nana' && (localStorage.getItem('qwrgggsdfg')!=null)) &&  <a href="/studentprofile" className="nav-link text-info fw-bold">Student Profile</a>}
                        </li>
                        <li className="nav-item">

                            {/* {(localStorage.getItem('qwrgggsdfg')!='nana' && (localStorage.getItem('qwrgggsdfg')!=null)) &&   */}
                            <a href="/register" className="nav-link text-info fw-bold">Register</a>
                            {/* } */}
                        </li>
                        <li className="nav-item">

                            {(localStorage.getItem('qwrgggsdfg')!='nana' && (localStorage.getItem('qwrgggsdfg')!=null)) &&  <a href="/viewgroup" className="nav-link text-info fw-bold">My Labs</a>}
                        </li>

                        

                        <li className="nav-item">
                            {(localStorage.getItem('qwrgggsdfg')!='yaya'  && (localStorage.getItem('qwrgggsdfg')!=null) )  &&  <a href="/staffdashboard" className="nav-link text-info fw-bold">Dashboard</a>}
                        </li>
                        <li className="nav-item">
                            {(localStorage.getItem('qwrgggsdfg')!='yaya'  && (localStorage.getItem('qwrgggsdfg')!=null) )  &&  <a href="/staffprofile" className="nav-link text-info fw-bold">Staff Profile</a>}
                        </li>
                        <li className="nav-item">
                            {(localStorage.getItem('qwrgggsdfg')!='yaya'  && (localStorage.getItem('qwrgggsdfg')!=null) )  &&  <a href="/registerstudent" className="nav-link text-info fw-bold">Register a Student</a>}
                        </li>
                        <li className="nav-item">
                            {(localStorage.getItem('qwrgggsdfg')!='yaya'  && (localStorage.getItem('qwrgggsdfg')!=null) )  &&  <a href="/listgroups" className="nav-link text-info fw-bold">Assign to Lab Groups</a>}
                        </li>
                        <li className="nav-item">
                            {(localStorage.getItem('qwrgggsdfg')!='yaya'  && (localStorage.getItem('qwrgggsdfg')!=null) )  &&  <a href="/listcourses" className="nav-link text-info fw-bold">Courses</a>}
                        </li>
                        <li className="nav-item">
                            {(localStorage.getItem('qwrgggsdfg')!='yaya'  && (localStorage.getItem('qwrgggsdfg')!=null) )  &&  <a href="/notice" className="nav-link text-info fw-bold">Notice</a>}
                        </li>
                       
                        {/* <li class="nav-item">
                            <a href="#Contact" className="nav-link text-info fw-bold">Help</a>
                        </li> */}
                        {/* <li class="nav-item">
                           
                            {(localStorage.getItem('token')==null) &&  <a href="/studentlogin" className="nav-link text-info fw-bold">Student Login</a>}

                        </li>
                        <li class="nav-item">
                            
                            {(localStorage.getItem('token')==null) && <a href="/stafflogin" className="nav-link text-info fw-bold">Staff Login</a>}

                        </li> */}
                        {/* <li class="nav-item">
                            <a href="#FAQ" className="nav-link text-info fw-bold">About</a>
                        </li> */}
                        {/* <li class="nav-item">
                            <a href="/guestregisterstudent" className="nav-link text-info fw-bold">Register a Student</a>
                        </li> */}
                        <li class="nav-item">
                          {(localStorage.getItem('uid')!=null) && <a href="#Logout" onClick={()=>{
                            window.location.href='/editprofile';
                          }} className="nav-link text-info fw-bold">Profile</a>}
                        </li><li class="nav-item">
                          {(localStorage.getItem('uid')!=null) && <a href="#Logout" onClick={()=>{
                            window.location.href='/changepassword';
                          }} className="nav-link text-info fw-bold">Change password</a>}
                        </li>
                        <li class="nav-item">
                          {(localStorage.getItem('uid')!=null) && <a href="#Logout" onClick={this.handlelogout} className="nav-link text-info fw-bold">Logout</a>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        );
    }
}
 
export default Navbar;