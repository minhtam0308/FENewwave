import ClassHome from '../css/Home.module.scss';

const HomeContent = () => {
    return (<>

        <div className="container my-5 flex-grow-1">
            <div className={`text-center mb-5 ${ClassHome.fadeIn}`}>
                <h2 className="fw-bold text-white">Find & Borrow Your Book</h2>
                <p className="text-light">Search our collection and start reading today.</p>
            </div>


            <form className={`d-flex justify-content-center mb-5 ${ClassHome.fadeIn}`} id="searchForm">
                <input className="form-control form-control-lg me-3 rounded-pill shadow-lg border-0" type="search"
                    placeholder="Search by title, author, or ISBN..." aria-label="Search" id="searchInput"
                    style={{ maxWidth: "500px" }} />
                <button className={`btn btn-primary btn-lg ${ClassHome.btnBeautiful} px-4`} type="submit"><i
                    className="bi bi-search me-2"></i>Search</button>
            </form>


            <div id="results" className={`row g-4 ${ClassHome.fadeIn}`}>

                <div className="col-md-6 col-lg-4">
                    <div className={`card ${ClassHome.bookCard} h-100 border-0 bg-white bg-opacity-90`}>
                        <div className="position-relative">
                            <img src="https://via.placeholder.com/350x500?text=The+Great+Gatsby"
                                className="card-img-top rounded-top-3" alt="Book Cover" />
                            <div className="position-absolute top-0 end-0 p-2">
                                <span className="badge bg-success rounded-pill"><i
                                    className="bi bi-check-circle-fill me-1"></i>Available</span>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column text-center">
                            <h5 className="card-title fw-bold text-dark">The Great Gatsby</h5>
                            <p className="card-text text-muted">By F. Scott Fitzgerald</p>
                            <div className="mt-auto">
                                <button className={`btn btn-outline-info ${ClassHome.btnBeautiful} w-100 mb-2`} data-bs-toggle="modal"
                                    data-bs-target="#detailsModal"
                                    onclick="loadDetails('The Great Gatsby', 'F. Scott Fitzgerald', '978-0-7432-7356-5', 'A timeless classic about the American Dream and the Jazz Age...', true)"><i
                                        className="bi bi-info-circle-fill me-2"></i>View Details</button>
                                <button className={`btn btn-success ${ClassHome.btnBeautiful} w-100`}
                                    onclick="borrowBook('The Great Gatsby')"><i className="bi bi-cart-plus-fill me-2"></i>Borrow
                                    Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className={`card ${ClassHome.bookCard} h-100 border-0 bg-white bg-opacity-90`}>
                        <div className="position-relative">
                            <img src="https://via.placeholder.com/350x500?text=The+Great+Gatsby"
                                className="card-img-top rounded-top-3" alt="Book Cover" />
                            <div className="position-absolute top-0 end-0 p-2">
                                <span className="badge bg-success rounded-pill"><i
                                    className="bi bi-check-circle-fill me-1"></i>Available</span>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column text-center">
                            <h5 className="card-title fw-bold text-dark">The Great Gatsby</h5>
                            <p className="card-text text-muted">By F. Scott Fitzgerald</p>
                            <div className="mt-auto">
                                <button className={`btn btn-outline-info ${ClassHome.btnBeautiful} w-100 mb-2`} data-bs-toggle="modal"
                                    data-bs-target="#detailsModal"
                                    onclick="loadDetails('The Great Gatsby', 'F. Scott Fitzgerald', '978-0-7432-7356-5', 'A timeless classic about the American Dream and the Jazz Age...', true)"><i
                                        className="bi bi-info-circle-fill me-2"></i>View Details</button>
                                <button className={`btn btn-success ${ClassHome.btnBeautiful} w-100`}
                                    onclick="borrowBook('The Great Gatsby')"><i className="bi bi-cart-plus-fill me-2"></i>Borrow
                                    Now</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>



    </>)
}
export default HomeContent;