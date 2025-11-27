import { useEffect, useState } from 'react';
import ClassHome from '../css/Home.module.scss';
import axios from '../../config/axiosConfig.js';
import { toast } from 'react-toastify';

const HomeContent = () => {
    const [listBook, setListBook] = useState([]);
    const [listImage, setListImage] = useState({});
    const [listAuthor, setListAuthor] = useState();
    const [reload, setReload] = useState(false);
    console.log(listBook, listImage, listAuthor);
    useEffect(() => {
        const getAllBook = async () => {
            try {
                const allBook = await axios.get(`/api/Book/getAllBook`);
                // console.log("allbook", allBook);
                if (allBook?.ec === 0) {
                    setListBook(allBook?.em);
                    return;
                }
                setListBook([]);
                toast.error("Cannot get data");

            } catch (e) {
                console.log(e);
            }
        }

        getAllBook();
    }, [reload]);
    useEffect(() => {
        const getImage = async (idImage) => {
            try {
                const resultImage = await axios.get(`/api/Image/getImage?idImage=${idImage}`, { responseType: "blob" });
                // console.log(resultImage);
                if (listImage[idImage]) {
                    URL.revokeObjectURL(listImage[idImage]);
                }
                setListImage(pre => ({ ...pre, [idImage]: URL.createObjectURL(resultImage) }));


            } catch (e) {
                console.log(e);
            }
        }
        const getAllImage = async () => {
            for (let bookInfor of listBook) {
                if (bookInfor.urlBook) {
                    await getImage(bookInfor.urlBook);
                }
            }
        }
        getAllImage();

    }, [listBook])
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

                <div className="col-md-6 col-lg-4 d-flex w-100 justify-content-start flex-wrap gap-3" style={{ height: "fit-content" }}>
                    {listBook?.map((val, index) => {
                        return (<div
                            className={`card ${ClassHome.bookCard} h-100 border-0 bg-white bg-opacity-90 col-3`}
                            style={{ minHeight: "300px", marginTop: "15px" }}
                            key={`index${index}`}

                        >
                            <div className="position-relative">
                                <img src={listImage[val.urlBook]}
                                    className="card-img-top rounded-top-3" alt="Book Cover"
                                    style={{ height: "90px" }}
                                />
                                <div className="position-absolute top-0 end-0 p-2">
                                    <span className="badge bg-success rounded-pill"><i
                                        className="bi bi-check-circle-fill me-1"></i>Available</span>
                                </div>
                            </div>
                            <div className="card-body d-flex flex-column text-center">
                                <h5 className="card-title fw-bold text-dark">{val.title}</h5>
                                <p className="card-text text-muted">{val.nameAuthor}</p>
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
                        </div>)

                    })}

                </div>


            </div>

        </div>



    </>)
}
export default HomeContent;