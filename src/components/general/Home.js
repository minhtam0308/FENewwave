import { Link, Outlet, useNavigate } from 'react-router-dom';
import ClassHome from '../css/Home.module.scss';
import { useEffect, useState } from 'react';
const Home = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const navigator = useNavigate();
    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to sign out?")) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            setUser(null);
            window.location.href = "http://localhost:3000/";
        }
    }


    return (<div className={`${ClassHome.body}`}>

        <nav className={`${ClassHome.navbar} navbar=expand-lg navbar-dark config mb-5`}>
            <div className={`${ClassHome.container} container`} style={{ "fontSize": "20px", "textAlign": "center" }}>
                <Link to={'/'} className="navbar-brand fw-bold" href="#">📖 Digital Library</Link>

                <div className="d-flex" id="navbarNav">
                    {user?.role === "admin" &&
                        <>
                            <div className={`${ClassHome.navcontainer} container`}>
                                <div className={`${ClassHome.dropdown}`}>
                                    <span className={`${ClassHome.pointer} nav-item mx-2`}>
                                        Manage
                                    </span>

                                    <div className={ClassHome.dropdownMenu}>
                                        <Link to="/manage-book" className={ClassHome.dropdownItem}>Manage Book</Link>
                                        <Link to="/manage-author" className={ClassHome.dropdownItem}>Manage Author</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </div>
                {/* User name on the right */}
                <div className="fw-bold">
                    {user ? <div className="ms-auto d-flex align-items-center">
                        <span className="m-2">{user.name}</span>
                        <button
                            className="btn btn-outline-light btn-sm mt-2"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>
                        :
                        <div className="ms-auto d-flex align-items-center">
                            <button
                                className="btn btn-outline-light btn-sm mt-2"
                                onClick={() => {
                                    navigator('/login');
                                }}
                            >
                                Login
                            </button>
                        </div>
                    }
                </div>

            </div>
        </nav >

        <div className={ClassHome.mainContent}>

            <Outlet />
        </div>
        <footer className={`${ClassHome.footer} py-4`}>
            <div className={`container text-center`}>
                <p>&copy; 2023 Digital Library. All rights reserved.</p>
                <a href="#" className="text-white me-3">Privacy Policy</a>
                <a href="#" className="text-white">Terms of Service</a>
            </div>
        </footer>
    </div >)
}
export default Home;