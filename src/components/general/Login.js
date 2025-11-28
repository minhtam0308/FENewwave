
import { useNavigate } from 'react-router-dom';
import classLogin from '../css/Login.module.scss';
import axios from '../../config/axiosConfig.js'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getToken, setToekn } from '../../context/contextToken.js';

const Login = () => {
    const navigator = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !pass) {
            toast.warning('Enter your email and password!');
            return;
        }
        if (!validateEmail(email)) {
            toast.warning('Email is wrong format!');
            return;
        }
        try {
            setLoading(true);
            const token = await axios.post('/api/Auth/login', {
                email,
                password: pass
            }, {
                withCredentials: true
            });
            if (token?.ec === 0) {
                setLoading(false);
                setToekn(token.em);
                console.log("token", getToken());
                localStorage.setItem("user", JSON.stringify(token.user));
                navigator('/');
                return;

            }
            toast.error(token?.em);
            setLoading(false);
            return;
            // console.log(token);
        } catch (error) {
            console.log(error);
            toast.error(error?.data);
            setLoading(false);
            toast.error(error);
        }

    }
    return (
        <div className={`${classLogin.body}`}>

            <div className={`${classLogin.container}`}>
                <div id="login-form">
                    <h2 className={`${classLogin.h2}`}>Login</h2>
                    <form id="login" className={`${classLogin.form} `}>
                        <input
                            type="text"
                            placeholder="Email"
                            required
                            id='id'
                            className={`${classLogin.input}`}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <div className={classLogin.passwordWrap}>
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                required
                                className={`${classLogin.input}`}
                                id='null'
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />

                            <span
                                className={classLogin.eye}
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? "🙈" : "👁"}
                            </span>
                        </div>

                    </form>
                    <button
                        className={`${classLogin.button} text-center`}
                        onClick={(e) => handleLogin(e)}
                        style={{ width: "100%" }}
                        disabled={loading}
                    >{loading ? <div className={classLogin.spinner}></div> : "Login"}</button>
                    <div className={`${classLogin.toggle}`}>
                        Don't have an account?
                        <span
                            className={`${classLogin.btn}`}
                            onClick={() => {
                                navigator("/signUp")
                            }}
                        >Sign up</span>
                    </div>
                    <div className={`${classLogin.toggle}`}>
                        <span
                            className={`${classLogin.btn}`}
                            onClick={() => {
                                navigator("/")
                            }}
                        >Go to homepage</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;