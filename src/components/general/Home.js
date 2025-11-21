import { Link, useNavigate } from 'react-router-dom';
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
        }
    }


    return (<div className={`${ClassHome.body}`}>

        <nav className={`${ClassHome.navbar} navbar=expand-lg navbar-dark config mb-5`}>
            <div className={`${ClassHome.container} container`}>
                <Link to={'/'} className="navbar-brand fw-bold" href="#">📖 Digital Library</Link>

                <div className="d-flex" id="navbarNav">
                    <div className={`${ClassHome.navcontainer} container`}>
                        <Link className={`${ClassHome.pointer} nav-item mx-2`}>Manage</Link>

                    </div>
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
        <section className="search-section">
            <div className="container text-center">
                <h1 className="display-4 fw-bold mb-4">Explore Infinite Knowledge</h1>
                <p className="lead mb-4">Search our vast collection of books, articles, and resources.</p>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control form-control-lg" placeholder="Search for books, authors, or topics..." aria-label="Search" />
                            <button className={`${ClassHome.btnmodern} btn text-white`} type="button">Search</button>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <span className="category-badge">Fiction</span>
                    <span className="category-badge">Science</span>
                    <span className="category-badge">History</span>
                    <span className="category-badge">Technology</span>
                    <span className="category-badge">Romance</span>
                </div>
            </div>
        </section>


        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-5 text-white">Popular Picks</h2>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className={`${ClassHome.card} card`}>
                            <img src="https://via.placeholder.com/300x200?text=Book+1" className="card-img-top" alt="Book 1" />
                            <div className="card-body">
                                <h5 className="card-title">The Quantum Leap</h5>
                                <p className="card-text">Dive into the mysteries of quantum physics.</p>
                                <a href="#" className={`${ClassHome.btnmodern} btn text-white w-100`}>Borrow Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className={`${ClassHome.card} card`}>
                            <img src="https://via.placeholder.com/300x200?text=Book+2" className="card-img-top" alt="Book 2" />
                            <div className="card-body">
                                <h5 className="card-title">Echoes of the Past</h5>
                                <p className="card-text">A historical novel that spans centuries.</p>
                                <a href="#" className={`${ClassHome.btnmodern} btn text-white w-100`}>Borrow Now</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-5">Your Library Dashboard</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className={`${ClassHome.card} card text-center`}>
                            <div className="card-body">
                                <h5 className="card-title">Borrowed Books</h5>
                                <p className="card-text">3 books currently checked out.</p>
                                <a href="#" className={`${ClassHome.btnmodern} btn text-white`}>View Details</a>
                            </div>
                        </div>
                    </div>                    <div className="col-md-4 mb-4">
                        <div className={`${ClassHome.card} card text-center`}>
                            <div className="card-body">
                                <h5 className="card-title">Borrowed Books</h5>
                                <p className="card-text">3 books currently checked out.</p>
                                <a href="#" className={`${ClassHome.btnmodern} btn text-white`}>View Details</a>
                            </div>
                        </div>
                    </div>                    <div className="col-md-4 mb-4">
                        <div className={`${ClassHome.card} card text-center`}>
                            <div className="card-body">
                                <h5 className="card-title">Borrowed Books</h5>
                                <p className="card-text">3 books currently checked out.</p>
                                <a href="#" className={`${ClassHome.btnmodern} btn text-white`}>View Details</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


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