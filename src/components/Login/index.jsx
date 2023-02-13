import React, { useContext } from 'react'
import Loading from "../../utils/Loading"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import { GeneralContext } from '../../contexts/general'
import "./login.scss"
const Login = () => {

    const { setLoginForm, loginForm, login } = useContext(AuthContext)
    const { isLoading, setLoading } = useContext(GeneralContext)

    const handleChange = (e, name) => {
        setLoginForm({ ...loginForm, [name]: e.target.value })
    }

    return (
        <div className='login' >
            {
                isLoading ? <Loading /> :
                    <div className="login_container">
                        <h1 style={{ textAlign: 'center' }} >Login</h1>
                        <div className="input_container">
                            <input className="login_input" placeholder='Enter your email' onChange={(e) => { handleChange(e, "email") }} />
                            <img src={require('../../assets/mail.svg').default} alt="mail" className='icon input_icon' />
                        </div>
                        <div className='button primary-btn login_btn  ' onClick={() => { setLoading(true); login() }} >
                            <p>Login</p>
                        </div>
                        <Link to='/signup' style={{ textAlign: 'center' }} > if you dont have an account signup  </Link>
                    </div>
            }

        </div>
    )
}

export default Login