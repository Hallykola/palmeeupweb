// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
// import { sign } from "jwt-encode";

const secretKey = "ro8asDWRWD5h5DVDVdfey8Xuu09JDjlNLnSLldY5";
const sign = require('jwt-encode');
var payload = {
  name: "Roger",
  role: "Admin",
};

export const generateJWT = (payload)=>{
    const mytoken = sign(payload, secretKey);
    localStorage.setItem('uid',mytoken);
}

export const getUserJWT = ()=>{
    let token = localStorage.getItem('uid');
    var decoded = jwtDecode(token);
    console.log('myjwt',decoded.email);
    return decoded;
    // (err, user) => {
    //     if (err) {
    //      console.log('error dey token');
    //     }else{
    //         console.log(user);
    //     }
    //   });
} 
