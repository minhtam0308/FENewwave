
import { useNavigate } from 'react-router-dom';
import '../css/Login.scss';

const Login = () => {
    const navigator = useNavigate();
    return (
        <div className="container">
            <div id="login-form">
                <h2>Login</h2>
                <form id="login">
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
                <div className="toggle">
                    Don't have an account?
                    <span
                        className='btn'
                        onClick={() => {
                            navigator("/signUp")
                        }}
                    >Sign up</span>
                </div>
            </div>
        </div>
    )
}

export default Login;