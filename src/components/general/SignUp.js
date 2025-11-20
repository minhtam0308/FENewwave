import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigator = useNavigate();
    return (
        <div className="container">
            <div id="signup-form" className="hidden">
                <h2>Sign Up</h2>
                <form id="signup">
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <button type="submit">Sign Up</button>
                </form>
                <div className="toggle">
                    Already have an account?
                    <span
                        className="btn"
                        onClick={() => {
                            navigator("/login")
                        }}>Login</span>
                </div>
            </div>
        </div>)
}

export default SignUp;