import { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";





function Home()
{
    const navigate=useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    return (
        <div>
            <Header/>
            <Link to="/add-product">ADD PRODUCT</Link>
        </div>
    )
}
export default Home;