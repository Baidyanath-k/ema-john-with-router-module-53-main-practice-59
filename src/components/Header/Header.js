import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContexts';
import logo from '../../images/Logo.svg';
import './Header.css';



const Header = () => {
    const {user,logOut}=useContext(AuthContext);
    console.log(user?.email)
    
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <p style={{color: "white"}}>
                {user?.email}
            </p>

            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.uid ?
                    <button onClick={logOut}>LogOut</button>
                    :<>
                        <Link to='/Login'>LogIn</Link>
                        <Link to='/SignUp'>SignUp</Link>
                    </>
                }
                
                
            </div>
        </nav>
    );
};

export default Header;