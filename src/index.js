import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Chat from './chats';
import Dashboard from './dashboard';
import Navbar  from "./components/navbar"
import PageNotFound  from "./components/pagenotfound"



import reportWebVitals from './reportWebVitals';
import Profile from './profile';
import Auth from './auth';
import EditProfile from './editprofile';
import Registration from './registration';
import {getUserJWT} from './jwt-helpers';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ChangePassword from './changepassword';
import ForgotPassword from './forgotpassword';


const root = ReactDOM.createRoot(document.getElementById('root'));
// const email = 'hallykola@gmail.com';
const receiver = 'haliruyusuf6@gmail.com';
const user = localStorage.getItem('uid')!=null ? getUserJWT():null;

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={localStorage.getItem('uid')!=null ?<Dashboard email={user.email} />}>
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/profile/:email" element={ <Profile email="haliruyusuf6@gmail.com"/>} />
//       <Route path="editprofile" element={<EditProfile email={email}/>} />
//       <Route path="/chat" element={<Chat email={email} receiver={receiver}/>} />
//       <Route path="register" element={<Registration />} />

      
//       {/* ... etc. */}
//     </Route>
//   )
// );

root.render(

  <React.StrictMode>
    
     {/* <RouterProvider router={router} /> */}
     <Navbar/>
     <BrowserRouter >
    <Routes>
      <Route path="/" element={localStorage.getItem('uid')!=null ? <Dashboard email={user.email}/> : <Auth/>} />
      <Route path="/login" element={localStorage.getItem('uid')!=null ? <Dashboard email={user.email}/> : <Auth/>} />
      <Route path="/dashboard" element={<Dashboard email={user?.email}/>} />
      <Route path="/profile/:email" element={ <Profile email={user?.email}/>} />
      <Route path="editprofile" element={<EditProfile email={user?.email}/>} />
      <Route path="/chat/:email" element={<Chat email={user?.email} 
      // receiver={email}
      />} />
      <Route path="register" element={<Registration />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="changepassword" element={<ChangePassword />} />
      <Route element={<PageNotFound />} />
      </Routes>
      </BrowserRouter >
     
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
