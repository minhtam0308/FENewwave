import { useNavigate } from "react-router-dom";
import classLogin from '../css/Login.module.scss';
import { useState } from "react";
import { toast } from "react-toastify";
import axios from '../../config/axiosConfig.js'

const SignUp = () => {
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validateZPassword = (pass) => {
        return String(pass)
            .match(
                /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})$/
            );
    };

    const handleSignUp = async () => {
        if (!email || !name || !pass || !confirmPass) {
            toast.warning('Fill full data');
            return;
        }
        if (pass !== confirmPass) {
            toast.warning('Password is not match!');
            return;
        }
        //pass ch du manh
        if (!validateEmail(email)) {
            toast.warning('Email is wrong!');
            return;
        }

        if (!validateZPassword(pass)) {
            // console.log(pass)
            toast.warning('password must containt 1 digit, 1 lowercase, 1 uppercase, 1 special character and at least 8 characters and and maximum of 20');
            return;
        }
        try {
            const api = await axios.post("/api/Auth/register", {
                email: email,
                password: pass,
                name: name
            });
            if (api?.errorCode === 0) {
                toast.success(api.errorMessage);
                navigator('/login');
            } else {
                toast.error(api?.errorMessage);
                return;
            }

        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }



    return (
        <div className={`${classLogin.body}`}>
            <div className={`${classLogin.container}`}>
                <div id="signup-form" className="hidden">
                    <h2 className={`${classLogin.h2} `}>Sign Up</h2>
                    <div id="signup" className={`${classLogin.form}`}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            className={`${classLogin.input} `}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className={`${classLogin.input} `}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className={`${classLogin.input} `}
                            value={pass}
                            onChange={(e) => {
                                setPass(e.target.value)
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            className={`${classLogin.input} `}
                            value={confirmPass}
                            onChange={(e) => {
                                setConfirmPass(e.target.value)
                            }}
                        />
                        <button
                            className={`${classLogin.button}`}
                            onClick={handleSignUp}
                        >Sign Up</button>
                    </div>
                    <div className={`${classLogin.toggle}`}>
                        Already have an account?
                        <span
                            className={`${classLogin.btn}`}
                            onClick={() => {
                                navigator("/login")
                            }}>Login</span>
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

export default SignUp;