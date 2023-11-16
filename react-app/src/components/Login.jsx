import Header from "./Header";
import { Link, useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useState } from "react";
import axios from "axios";
function Login()
{
    const navigate=useNavigate();
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const data={ username,password};
    const url='http://localhost:8080/login';
    const handleApi=()=>{
        console.log({username,password});
        axios.post(url,data)
        .then((res)=>{
            console.log(res.data);
            if(res.data.message){
                alert(res.data.message);
                if(res.data.token)
                {
                    localStorage.setItem('token',res.data.token)//localstorage mein save krna h 
                    navigate('/');//home pr pahunch jayenge
                }
            }
            

        })
        .catch((err)=>{
            console.log(err);
            alert('server error');
        })
    }
    return (
        <div>
            <Header />
            Welcome to login page
               <br ></br>
               Username
            <input type="text" value={username} 
             onChange={(e)=>{
                setusername(e.target.value)
            }}/>
            <br ></br>
            password
            <input type="text" value={password} 
            onChange={(e)=>{
                setpassword(e.target.value)
            }}/>
            <br ></br>
            <button onClick={handleApi} >LOGIN</button>
            <Link to="/signup">SIGNUP</Link>


        </div>
    )
}

export default Login;