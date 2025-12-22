import { useEffect, useState } from 'react';
import classBorrowCart from '../css/BorrowCart.module.scss'
import ModalConfirmBorrowBook from './ModalUser/ModalConfirmBorrowBook';
import axios from '../../config/axiosConfig.js';
import { toast } from 'react-toastify';
import ModalConfirmDelPro from './ModalUser/ModalConfirmDelPro.js';
const BorrowCart = () => {
    const [showModalConfirmBorrow, setShowModalConfirmBorrow] = useState(false);

    const [reload, setReload] = useState(false);
    const [listImage, setListImage] = useState({});

    const [listBook, setListBook] = useState([]);
    const [idCart, setIdCart] = useState("");

    const [showModalDelBook, setShowModalDelBook] = useState(false);
    const [delValue, setDelvalue] = useState({});
    const imageDel = delValue.urlBook ? listImage[delValue.urlBook] : "";



    useEffect(() => {
        const getImage = async (idImage) => {
            try {
                const resultImage = await axios.get(`/api/Image/getImage?idImage=${idImage}`, { responseType: "blob" });
                // console.log(resultImage);
                if (listImage[idImage]) {
                    URL.revokeObjectURL(listImage[idImage]);
                }
                try {

                    setListImage(pre => ({ ...pre, [idImage]: URL.createObjectURL(resultImage) }));

                } catch (e) {
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }
        }
        const getAllImage = async (listBook) => {
            for (let bookInfor of listBook) {
                if (bookInfor.urlBook) {
                    await getImage(bookInfor.urlBook);
                }
            }
        }
        const getAllBook = async () => {
            try {
                const allBook = await axios.get(`/api/Cart/getAllCart`);
                // console.log("allbook", allBook);
                if (allBook?.errorCode === 201) {
                    setListBook(allBook?.data.listBook);
                    getAllImage(allBook?.data.listBook);
                    setIdCart(allBook?.data.idCart);
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


    const handleChangeQuantity = async (bookChangeQuantity) => {
        //put changhe quantity cart
        const resPutChangeQuantityBook = await axios.put(`/api/CartBook/putChangeQuantityCartBook`, {
            idCart: idCart,
            idBook: bookChangeQuantity.id,
            quantity: bookChangeQuantity.quantity
        });
        if (resPutChangeQuantityBook?.errorCode !== 201) {
            toast.error(resPutChangeQuantityBook.errorMessage);
            setReload(!reload);
            return;
        }

    }

    // console.log(listBook);
    // console.log(listImage)

    return (
        <>
            <div className={`${classBorrowCart.container} container mt-3`}>
                <h1><i className="bi bi-cart3 me-3"></i>Your Borrowing Cart</h1>


                <div className="row">
                    {listBook.length > 0 && listBook.map((val, index) => {
                        return (
                            <div className="col-md-12 mb-4" key={`index${index}`}>
                                <div className={`${classBorrowCart.card} card`}>
                                    <div className="card-body d-flex align-items-center p-4">
                                        <div className={`${classBorrowCart.bookCover}`}>
                                            {/* <i className="bi bi-book-half text-white" style={{ fontSize: "2.5rem" }}></i> */}
                                            {val.urlBook && listImage[val.urlBook] && <img src={`${listImage[val.urlBook]}`} alt='book' style={{ width: "100%", height: "100%" }} />}
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="card-title text-white mb-2">{val.title}</h5>
                                            <p className="card-text mb-1"><i className="bi bi-person me-2"></i><strong>Author:</strong> {val.nameAuthor}</p>
                                            <p className="card-text mb-1"><i className="bi bi-person me-2"></i><strong>Quantity:</strong>
                                                <input
                                                    value={val.quantity}
                                                    type='number'
                                                    style={{ width: "100px", textAlign: "center" }}
                                                    onBlur={() => {
                                                        handleChangeQuantity(val);
                                                    }}
                                                    onChange={(event) => {
                                                        if (event.target.value > 0 && event.target.value < val.availableCopies) {
                                                            setListBook(pre =>
                                                                pre.map((book, indexBook) => {
                                                                    if (indexBook === index) {
                                                                        book.quantity = event.target.value;
                                                                        return book;
                                                                    }
                                                                    return book;
                                                                }))
                                                        }
                                                    }}
                                                />
                                            </p>
                                        </div>
                                        <button
                                            className={`btn ${classBorrowCart.btnDangerModern} btn-sm`}
                                            onClick={() => {
                                                setDelvalue(val);
                                                setShowModalDelBook(true);
                                            }}
                                        >
                                            <i className="bi bi-x-circle"></i> Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className={`card ${classBorrowCart.summaryCard}`}>
                            <div className="card-body text-center p-4">
                                <h5 className="text-white mb-3"><i className="bi bi-receipt me-2"></i>Cart Summary</h5>
                                <p className="mb-2"><strong>Total Books:</strong> {listBook.length}</p>
                                <button className={`btn ${classBorrowCart.btnModern} me-3`}
                                    onClick={() => {
                                        setShowModalConfirmBorrow(true);
                                    }}
                                ><i className="bi bi-check-circle-fill me-2"></i>Borrow Now</button>
                                <button className={`btn btn-secondary ${classBorrowCart.btnModern}`}><i className="bi bi-arrow-left me-2"></i>Continue Browsing</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirmBorrowBook
                show={showModalConfirmBorrow}
                setShow={setShowModalConfirmBorrow}
                listBook={listBook}
                listImage={listImage}
                key={"cart"}
                reload={reload}
                setReload={setReload}
            />
            <ModalConfirmDelPro
                show={showModalDelBook}
                setShow={setShowModalDelBook}
                delValue={delValue}
                reload={reload}
                setReload={setReload}
                imageDel={imageDel}
                idCart={idCart}
            />

        </>
    )
}

export default BorrowCart;