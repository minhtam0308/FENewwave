
import { useNavigate } from 'react-router-dom';
import classLogin from '../css/Login.module.scss';

const Login = () => {
    const navigator = useNavigate();
    return (
        <div className={`${classLogin.body}`}>

            <div className={`${classLogin.container}`}>
                <div id="login-form">
                    <h2 className={`${classLogin.h2} `}>Login</h2>
                    <form id="login" className={`${classLogin.form} `}>
                        <input type="email" placeholder="Email" required className={`${classLogin.input} `} />
                        <input type="password" placeholder="Password" required className={`${classLogin.input} `} />
                        <button type="submit" className={`${classLogin.button} `}>Login</button>
                    </form>
                    <div className={`${classLogin.toggle}`}>
                        Don't have an account?
                        <span
                            className={`${classLogin.btn}`}
                            onClick={() => {
                                navigator("/signUp")
                            }}
                        >Sign up</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;