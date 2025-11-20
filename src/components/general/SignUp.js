import { useNavigate } from "react-router-dom";
import classLogin from '../css/Login.module.scss';

const SignUp = () => {
    const navigator = useNavigate();
    return (
        <div className={`${classLogin.body}`}>
            <div className={`${classLogin.container}`}>
                <div id="signup-form" className="hidden">
                    <h2 className={`${classLogin.h2} `}>Sign Up</h2>
                    <form id="signup" className={`${classLogin.form}`}>
                        <input type="text" placeholder="Full Name" required className={`${classLogin.input} `} />
                        <input type="email" placeholder="Email" required className={`${classLogin.input} `} />
                        <input type="password" placeholder="Password" required className={`${classLogin.input} `} />
                        <input type="password" placeholder="Confirm Password" required className={`${classLogin.input} `} />
                        <button type="submit" className={`${classLogin.button} `}>Sign Up</button>
                    </form>
                    <div className={`${classLogin.toggle}`}>
                        Already have an account?
                        <span
                            className={`${classLogin.btn}`}
                            onClick={() => {
                                navigator("/login")
                            }}>Login</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;