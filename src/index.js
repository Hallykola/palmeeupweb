import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Chat from './chats';
import Dashboard from './dashboard';


import reportWebVitals from './reportWebVitals';
import Profile from './profile';
import Auth from './auth';
import EditProfile from './editprofile';
import Registration from './registration';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
const email = 'hallykola@gmail.com';
const receiver = 'haliruyusuf6@gmail.com';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Dashboard email="haliruyusuf6@gmail.com" />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile/:email" element={ <Profile email="haliruyusuf6@gmail.com"/>} />
      <Route path="editprofile" element={<EditProfile email={email}/>} />
      <Route path="/chat" element={<Chat email={email} receiver={receiver}/>} />
      <Route path="register" element={<Registration />} />

      
      {/* ... etc. */}
    </Route>
  )
);

root.render(
  <React.StrictMode>
    
     {/* <RouterProvider router={router} /> */}
     <BrowserRouter >
    <Routes>
    <Route path="/" element={<Dashboard email="haliruyusuf6@gmail.com" />} />
      <Route path="/dashboard" element={<Dashboard email="haliruyusuf6@gmail.com"/>} />
      <Route path="/profile/:email" element={ <Profile email="haliruyusuf6@gmail.com"/>} />
      <Route path="editprofile" element={<EditProfile email={email}/>} />
      <Route path="/chat/:email" element={<Chat email={email} receiver={receiver}/>} />
      <Route path="register" element={<Registration />} />
      </Routes>
      </BrowserRouter >
     
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
