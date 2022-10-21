import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContexts';

const SignUp = () => {
    const{createSignupUser}=useContext(AuthContext);
    const[error,setError]=useState(null);


    const signupFormHandle=(event)=>{

        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        const confirmPassword=form.confirm.value
        
        //Start password setup
        if(password.length < 6){
            setError("Password should be 6 characters or more");
            return;
        };

        if(password !== confirmPassword){
            setError('Your Password did not match');
            return;
        };
        setError('')
        //End password setup


        //Start:: create signup/register authentication
        createSignupUser(email,password)
        .then(result=>{
            const user=result.user;
            form.reset();
            console.log(user);
        })
        .catch(error=>{
            console.error('Error is',error)
        })
        //End:: create signup/register authentication
    }
    
        
    
    
    return (
        <div className='form-login-container'>
            <h2 className='form-login-title'>Sign Up</h2>
            <form onSubmit={signupFormHandle}>
                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" id="" placeholder='Enter email' required />
                </div>

                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" id="" placeholder='password' required />
                </div>

                <div className="form-control">
                    <label htmlFor='confirm'>Confirm Password</label>
                    <input type="password" name="confirm" id="" placeholder='Confirm Password' required />
                </div>
                <p className='set-error'>{error}</p>
                <input className='login-btn' type="submit" value="Sign Up" />
            </form>

            <p className='login-sign'>Already have an account? <Link to="/Login">Login</Link> </p>

        </div>
    );
};

export default SignUp;