import { Link, Outlet, useNavigate } from 'react-router-dom';
import ClassHome from '../css/Home.module.scss';
import '../css/generalCss.scss';
import { useEffect, useState } from 'react';
import { Button, Dropdown, Modal, Nav } from 'react-bootstrap';
import axios from '../../config/axiosConfig.js';
import { toast } from 'react-toastify';
import { useUserContext } from '../../context/UserContext.js';

const Home = () => {
    const { userContext, setUserContext, setImageContext } = useUserContext();
    const [user, setUser] = useState(localStorage.getItem('user') ? localStorage.getItem('user') : null);
    const [imageUser, setImageUser] = useState();
    const navigator = useNavigate();
    const [showModalLogOut, setShowModalLogOut] = useState(false);

    const handleCloseModalLogout = () => setShowModalLogOut(false);
    const handleShowModalLogout = () => setShowModalLogOut(true);
    const handleSignOut = () => {
        const handleLogOut = async () => {
            const resultLogut = await axios.get('/api/Auth/logout', {
                withCredentials: true
            });
            if (resultLogut?.ec === 0) {
                localStorage.removeItem("user");
                setUser(null);
                setUserContext(null);
                window.location.href = "http://localhost:3000/";
                handleCloseModalLogout();
            } else {
                toast.error('error from be');
            }

        }
        handleLogOut();

    }
    useEffect(() => {
        const getImageUser = async () => {
            if (localStorage.getItem("user") && localStorage.getItem("user") !== 'undefined') {
                let userTemp = JSON.parse(localStorage.getItem("user"));
                setUser(userTemp);
                setUserContext(userTemp);
                const imageUserData = await axios.get(`/api/Image/getImage?idImage=${userTemp.urlUserImage}`, { responseType: "blob" });
                if (imageUserData?.ec !== 1) {
                    // console.log(imageUserData);
                    setImageUser(URL.createObjectURL(imageUserData));
                    setImageContext(URL.createObjectURL(imageUserData));

                }

            }
        }
        getImageUser();
    }, [localStorage])


    return (<div className={`${ClassHome.body}`}>

        <div
            className={`position-absolute top-0 end-1 p-4 ${ClassHome.zIndex10}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
                if (localStorage.getItem('user')) {

                    navigator('/profile-user', { state: { user, imageUser } });
                } else {
                    toast.warn("You need to login before")
                }
            }}
        >
            <img src={imageUser} alt="User Image"
                class={`rounded-circle mb-4 ${ClassHome.userImage}`} style={{ "width": "90px", "height": "90px" }} />
        </div>

        <header className={`${ClassHome.heroBg} d-flex align-items-center justify-content-center text-center`}>
            <div className={`${ClassHome.heroText}`}>
                <h1 className="display-4 fw-bold mb-3"><i className="bi bi-book-half me-3"></i> Library</h1>
            </div>
        </header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-75 shadow-lg sticky-top">
            <div className="container-fluid">
                <div className="navbar-brand fw-bold" href="#"><i className="bi bi-house-door-fill me-2"></i>
                    <Link to="/">Home</Link>
                </div>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to={'/library'} className="nav-link" href="#"><i className="bi bi-book-half me-1"></i>
                                Library</Link></li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/borrowCart'}>
                                <i className="bi bi-cart-plus-fill me-1"></i>Borrow Books</Link></li>
                        {user?.role === "admin" && (
                            <Nav.Item>
                                <Dropdown as={Nav.Item}>
                                    <Dropdown.Toggle as={Nav.Link} id="admin-dropdown">
                                        <i className="bi bi-person-circle me-1"></i>
                                        Admin
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/manage-authors">
                                            Manage authors
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/manage-books">
                                            Manage books
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>
                        )}
                    </ul>
                    {user ?
                        <ul className="navbar-nav"
                            onClick={handleShowModalLogout}
                        >
                            <li className="nav-item">
                                <Link className="nav-link">
                                    <i className="bi bi-box-arrow-right me-1"></i>Logout</Link></li>
                        </ul> :
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to={'login'}>
                                    <i className="bi bi-box-arrow-right me-1"></i>Login
                                </Link></li>
                        </ul>

                    }

                </div>
            </div>
        </nav>
        <div className={ClassHome.mainContent}>
            <Outlet />
        </div>
        <footer className="bg-dark text-white text-center py-4 mt-auto">
            <div className="container">
                <p className="mb-0">&copy; 2023 Beautiful Library. <a href="#" className="text-decoration-none text-light">Contact
                    Us</a> | <a href="#" className="text-decoration-none text-light">Help</a> | <a href="#"
                        className="text-decoration-none text-light">Privacy</a></p>
            </div>
        </footer>
        <Modal show={showModalLogOut} onHide={handleCloseModalLogout}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure logout this account!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalLogout}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => {
                    handleSignOut();
                }}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>

    </div >)
}
export default Home;