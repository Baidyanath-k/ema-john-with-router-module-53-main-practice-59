import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContexts';
import './Login.css'


const Login = () => {
    const{createLoginUser}=useContext(AuthContext);
    const [success,setSuccess]=useState(false);
    const [unsuccess,unsetSuccess]=useState(false);
    const navigate=useNavigate();
    const location=useLocation();
    const from=location.state?.from?.pathname||'/';

    const formLoginHandler=(event)=>{
        event.preventDefault();
        setSuccess(false);
        unsetSuccess(false);
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        
        //create login authentication
        createLoginUser(email,password)
        .then(result=>{
            const user= result.user;
            setSuccess(true);
            form.reset();
            navigate(from,{replace:true});
            console.log(user);
        })
        .catch(error=>{
            unsetSuccess(true);
            console.error(error);
        })
    }
    
    return (
        <div className='form-login-container'>
            <h2 className='form-login-title'>Login</h2>
            <form onSubmit={formLoginHandler}>
                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" id="" placeholder='Enter email' required />
                </div>

                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" id="" placeholder='password' required />
                </div>
                
                
                <input className='login-btn' type="submit" value="Login" />
                {
                    success&&<h3 style={{color: "green"}}> Login success</h3>
                }
                {
                    unsuccess&&<h3 style={{color: "red"}}> Login Unsuccess</h3>
                }
            </form>

            <p className='login-sign'>New to Ema-John? <Link to="/SignUp">Create New Account</Link> </p>

        </div>
    );
};

export default Login;