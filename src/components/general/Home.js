import ClassHome from '../css/Home.scss';

const Home = () => {
    return (<>

        <nav className={`${ClassHome.navbar} ${ClassHome.navbarexpandlg} ${ClassHome.navbardark}`}>
            <div class="container">
                <a class="navbar-brand fw-bold" href="#">📖 Digital Library</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Browse</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">My Books</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Account</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>)
}
export default Home;