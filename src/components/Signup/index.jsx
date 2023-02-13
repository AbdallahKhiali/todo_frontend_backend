import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import "./signup.scss"

const Signup = () => {

    const { setSignupForm, signupForm, signup } = useContext(AuthContext)

    const handleChange = (e, name) => {
        setSignupForm({ ...signupForm, [name]: e.target.value })
    }

    return (
        <div className='signup' >
            <div className="signup_container">
                <h1 style={{ textAlign: 'center' }} >Signup</h1>
                <div className="input_container">
                    <input className="signup_input" placeholder='Enter your email' onChange={(e) => { handleChange(e, "email") }} />
                    <img src={require('../../assets/mail.svg').default} alt="mail" className='icon input_icon' />
                </div>
                <div className='button primary-btn signup_btn  ' onClick={() => { signup() }} >
                    <p>signup</p>
                </div>

                <Link to='/login' style={{ textAlign: 'center' }}> if you have an account already login  </Link>

            </div>
        </div>
    )
}

export default Signup