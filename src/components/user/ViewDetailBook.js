import { useNavigate } from 'react-router-dom';
import ClassView from '../css/ViewDetail.module.scss';
import { useState } from 'react';


const ViewDetailBook = (props) => {

    const [book, setBook] = useState(localStorage.getItem("Book") ? JSON.parse(localStorage.getItem("Book")) : {});
    const [image, setImage] = useState(localStorage.getItem("Image"));
    const navigator = useNavigate();
    console.log(image)
    return (
        <div className="container my-5">
            <div onClick={() => {
                navigator(-1);
            }} className="btn btn-light back-btn btn-custom shadow"><i className="bi bi-arrow-left"></i> Back</div>
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className={`${ClassView.bookCard} p-4`}>
                        <div className="row">

                            <div className="col-md-4 text-center">
                                <img src={`${image.replaceAll('"', '')}`} className="img-fluid rounded shadow-lg mb-3" style={{ height: "100%" }} alt="Book Cover" />
                            </div>

                            <div className="col-md-8">
                                <h1 className="display-4 fw-bold text-primary mb-2"><i className="bi bi-book"></i> {book.title}</h1>
                                <p className="text-muted fs-4 mb-3">by {book.nameAuthor}</p>
                                <div className="mb-3">
                                    <span className="badge bg-info me-2"><i className="bi bi-tag"></i> Fiction</span>
                                    <span className="badge bg-secondary"><i className="bi bi-star"></i> Classic</span>
                                </div>
                                <p className="lead text-dark">
                                    Description: {book.description}
                                </p>
                                <ul className="list-group list-group-flush mb-4">
                                    <li className="list-group-item bg-transparent"><strong><i className="bi bi-calendar"></i> Publication date:</strong> {book.createdAt}</li>
                                    <li className="list-group-item bg-transparent"><strong><i className="bi bi-file-earmark"></i> Pages:</strong> 180</li>
                                    <li className="list-group-item bg-transparent"><strong><i className="bi bi-upc"></i> ISBN:</strong> 978-0-7432-7356-5</li>
                                    <li className="list-group-item bg-transparent"><strong><i className="bi bi-star-fill"></i> Rating:</strong>
                                        <span className={`${ClassView.ratingStars} fs-5`}>★★★★☆</span> (4.2/5 from 1,234 reviews)
                                    </li>
                                </ul>
                                <div className="d-flex gap-2">
                                    <button className={`btn btn-primary ${ClassView.btnCustom} px-4`}><i className="bi bi-cart-plus"></i> Add to Cart</button>
                                    <button className={`btn btn-outline-info ${ClassView.btnCustom} px-4`}><i className="bi bi-eye"></i> Read Sample</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                <div className="col-lg-10">
                    <h3 className="text-white mb-4"><i className="bi bi-chat-quote"></i> Reader Reviews</h3>
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                                <img className="rounded-circle me-3" alt="User Avatar" />
                                <div>
                                    <h5 className="card-title mb-0">John Doe</h5>
                                    <small className="text-muted">October 15, 2023</small>
                                </div>
                            </div>
                            <p className="card-text">"An timeless masterpiece. Highly recommend!"</p>
                            <div className={`${ClassView.ratingStars}`}>★★★★★</div>
                        </div>
                    </div>
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                                <img className="rounded-circle me-3" alt="User Avatar" />
                                <div>
                                    <h5 className="card-title mb-0">Jane Smith</h5>
                                    <small className="text-muted">September 22, 2023</small>
                                </div>
                            </div>
                            <p className="card-text">"Captivating prose and deep insights. A must-read for literature lovers."</p>
                            <div className={`${ClassView.ratingStars}`}>★★★★☆</div>
                        </div>
                    </div>

                    <div className={`${ClassView.commentForm} shadow-sm`}>
                        <h4 className="text-primary mb-4"><i className="bi bi-pencil-square"></i> Leave a Comment</h4>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Your Name</label>
                                <input type="text" className="form-control" id="commentName" placeholder="Enter your name" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Your Rating</label>
                                <div className={`${ClassView.ratingStars} fs-4`} id="userRating">
                                    <i className="bi bi-star" data-rating="1"></i>
                                    <i className="bi bi-star" data-rating="2"></i>
                                    <i className="bi bi-star" data-rating="3"></i>
                                    <i className="bi bi-star" data-rating="4"></i>
                                    <i className="bi bi-star" data-rating="5"></i>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Your Comment</label>
                                <textarea className="form-control" id="commentText" rows="4" placeholder="Share your thoughts about this book..." required></textarea>
                            </div>
                            <button type="submit" className={`btn btn-primary ${ClassView.btnCustom}`}><i className="bi bi-send"></i> Submit Comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetailBook;