import './Header.css'
import { Link,useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';



function Header(){
    const navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="header">
            <Link to="/">Home</Link>
            
        <span className='mt-3'>   selllllll and purchase </span>
        {
            !localStorage.getItem('token')?
        
        <Link to="/login">Login</Link>:
        <button onClick={handleLogout}>LOGOUT</button>
        }
        </div>
    )
}


export default Header;