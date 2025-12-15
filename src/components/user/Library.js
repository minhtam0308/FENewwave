
import axios from '../../config/axiosConfig.js';
import { useEffect, useRef, useState } from 'react';
import classLybrary from '../css/Library.module.scss'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ModalConfirmAddCart from './ModalUser/ModalConfirmAddCart.js';

const Library = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    // const [continueGetPage, setContinueGetPage] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [listBook, setListBook] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [listAuthor, setListAuthor] = useState([]);
    const [bookFilter, setBookFillter] = useState();
    const [numberPages, setNumberPage] = useState(0);

    const [showModalAddToCart, setShowModalAddToCart] = useState(false);
    const [productInfor, setProductInfor] = useState({});
    const imageAddCartInfor = productInfor.urlBook ? listImage[productInfor.urlBook] : "";

    const loadRef = useRef();
    const navigator = useNavigate();

    useEffect(() => {
        const getPaginateBook = async () => {
            // await new Promise((resolve) => {
            //     setTimeout(() => {
            //         resolve();
            //     }, 250);
            // })
            const resultPage = await axios.get(`/api/Book/getPagedBook?PageSize=${pageSize}&PageNumber=${page}`);
            if (resultPage?.errorCode === 0) {
                setTotalPage(resultPage.data.totalPages)
                // setListBook(pre => ([...pre, ...resultPage.data.items]));
                setListBook(resultPage.data.items);
            }
        }
        getPaginateBook();
    }, [page])
    console.log(page);
    useEffect(() => {
        const getImage = async (idImage) => {
            try {
                // await new Promise((resolve) => {
                //     setTimeout(() => {
                //         resolve();
                //     }, 250);
                // })
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

    // useEffect(() => {
    //     if (!continueGetPage)
    //         return;
    //     const observer = new IntersectionObserver((entries) => {
    //         if (entries[0].isIntersecting) {
    //             setPage(prev => prev + 1);
    //         }
    //     });
    //     const loader = loadRef.current;
    //     if (loader) observer.observe(loader);
    //     return () => {
    //         if (loader) observer.unobserve(loader);
    //     };
    // }, []);

    useEffect(() => {
        const getAllAuthor = async () => {
            try {
                const allAuthor = await axios.get(`/api/Author/getAllAuthor`);
                if (allAuthor?.errorCode === 0) {

                    // console.log(allAuthor?.em);
                    setListAuthor(allAuthor?.data);
                    return;
                }
                toast.error(allAuthor?.em);
            } catch (e) {
                console.log(e);
            }
        }
        getAllAuthor();

    }, []);

    const handleFilter = (key) => {
        console.log(key)
        if (key === 'all') {
            setBookFillter();
            setNumberPage(totalPage);
            return;
        }
        setBookFillter(listBook.filter((val) => {
            if (val.idAuthor === key) {
                return val;
            }
        }));
        if (setBookFillter && setBookFillter.length) {
            setNumberPage(setBookFillter.length / 6 + 1);
        } else {
            setNumberPage(0);
        }
    }
    // console.log(bookFilter);
    return (<>
        <div className=" my-5 mx-5" style={{ width: "93vw" }}>
            <div className="row">
                <div className="col-lg-3">
                    <div className={`${classLybrary.sidebar}`}>
                        <h4 className="mb-4">Browse by Author</h4>
                        <div
                            className={`${classLybrary.authorLink}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                handleFilter('all');

                            }}

                        >All</div>
                        {listAuthor.map((val, index) => {
                            return (
                                <div
                                    key={`inedexAuthor${index}`}
                                    className={`${classLybrary.authorLink}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        handleFilter(val.id);
                                    }}

                                >{val.nameAuthor}</div>

                            )

                        })}
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row" id="bookGrid">
                        {!bookFilter ? listBook.map((val, index) => {
                            return (
                                <div className={`col-md-6 col-lg-4 mb-4 ${classLybrary.bookCard} ${classLybrary.show}`} data-author="F. Scott Fitzgerald" key={`index${index}`}>
                                    <div className="card">
                                        <img src={listImage[val.urlBook]} className={`card-img-top ${classLybrary.bookImage}`} alt="Book 1" />
                                        <div className={`card-body ${classLybrary.cardBody}`}>
                                            <h5 className="card-title">{val.title}</h5>
                                            <p className="card-text">By {val.nameAuthor}</p>
                                            <p className="card-text">{val.description}</p>
                                            <div className='text-center'>
                                                <button className={`btn btn-outline-info w-100 mb-2`} data-bs-toggle="modal"
                                                    onClick={() => {
                                                        navigator('/view-detailbook');
                                                        localStorage.setItem("Book", JSON.stringify(val));
                                                        localStorage.setItem("Image", JSON.stringify(listImage[val.urlBook]));
                                                    }}
                                                >
                                                    <i className="bi bi-info-circle-fill me-2"></i>View Details
                                                </button>
                                            </div>
                                            <button className={`btn btn-success w-100`}
                                                onClick={() => {
                                                    setShowModalAddToCart(true);
                                                    setProductInfor(val);
                                                }}><i className="bi bi-cart-plus-fill me-2"></i>Borrow Now</button>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                            :
                            bookFilter.map((val, index) => {
                                return (
                                    <div className={`col-md-6 col-lg-4 mb-4 ${classLybrary.bookCard} ${classLybrary.show}`} data-author="F. Scott Fitzgerald" key={`index${index}`}>
                                        <div className="card">
                                            {val.urlBook && <img src={listImage[val.urlBook]} className={`card-img-top ${classLybrary.bookImage}`} alt="Book 1" />}
                                            <div className={`card-body ${classLybrary.cardBody}`}>
                                                <h5 className="card-title">{val.title}</h5>
                                                <p className="card-text">By {val.nameAuthor}</p>
                                                <p className="card-text">{val.description}</p>
                                                <div className='text-center'>
                                                    <button className={`btn btn-outline-info w-100 mb-2`} data-bs-toggle="modal">
                                                        <i className="bi bi-info-circle-fill me-2"></i>View Details
                                                    </button>
                                                </div>
                                                <button className={`btn btn-success w-100`}
                                                    onClick={() => {
                                                        setShowModalAddToCart(true);
                                                        setProductInfor(val);
                                                    }}><i className="bi bi-cart-plus-fill me-2">
                                                    </i>Borrow Now</button>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }

                        {/* {continueGetPage && <div ref={loadRef} className={classLybrary.spinner}></div>} */}
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${page === 1 ? "disable" : ""}`}>
                                    <button
                                        className="page-link"
                                        tabindex="-1" aria-disabled="true"
                                        onClick={() => {
                                            if (page > 1) {
                                                setPage(pre => pre - 1);
                                            }
                                        }}
                                    >Pre</button>
                                </li>
                                {[...Array(numberPages)].map((val, index) => {
                                    return (
                                        <li
                                            className={`page-item ${index + 1 === page ? "active" : ""}`}
                                            onClick={() => {
                                                setPage(index + 1);
                                            }}
                                        ><button className="page-link"
                                        >{index + 1}</button></li>
                                    )
                                })}


                                <li className={`page-item ${page === 1 ? "disable" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => {
                                            if (page < totalPage) {
                                                setPage(pre => pre + 1);
                                            }
                                        }}
                                    >Next</button>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </div >
        <ModalConfirmAddCart
            show={showModalAddToCart}
            setShow={setShowModalAddToCart}
            productInfor={productInfor}
            image={imageAddCartInfor}
        />
    </>)
}
export default Library;