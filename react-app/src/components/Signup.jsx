import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios";

function Signup()
{
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const url='http://localhost:8080/signup';
    const data={ username,password};
    const handleApi=()=>{
        console.log({username,password});
        axios.post(url,data)
        .then((res)=>{
            console.log(res.data);
            if(res.data.message)
            alert(res.data.message);

        })
        .catch((err)=>{
            console.log(err);
            alert('server error');
        })
    }
    return (
        <div>
            <Header />
            Welcome to signup page
               <br ></br>
               Username
            <input type="text" value={username}
            onChange={(e)=>{
                setusername(e.target.value)
            }} />
            <br ></br>
            password
            <input type="text" value={password}
            onChange={(e)=>{
                setpassword(e.target.value)
            }} /> 
        
            <br />
            <button onClick={handleApi} >SIGNUP</button>
            <Link to="/login">LOGIN</Link>


        </div>
    )
}

export default Signup