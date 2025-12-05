import { useState } from 'react';
import classBorrowCart from '../css/BorrowCart.module.scss'
import ModalConfirmBorrowBook from './ModalUser/ModalConfirmBorrowBook';

const BorrowCart = () => {
    const [showModalConfirmBorrow, setShowModalConfirmBorrow] = useState(false);

    return (
        <>
            <div className={`${classBorrowCart.container} container mt-3`}>
                <h1><i className="bi bi-cart3 me-3"></i>Your Borrowing Cart</h1>


                <div className="row">

                    <div className="col-md-12 mb-4">
                        <div className={`${classBorrowCart.card} card`}>
                            <div className="card-body d-flex align-items-center p-4">
                                <div className={`${classBorrowCart.bookCover}`}>
                                    <i className="bi bi-book-half text-white" style={{ fontSize: "2.5rem" }}></i>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="card-title text-white mb-2">Book Title 1</h5>
                                    <p className="card-text mb-1"><i className="bi bi-person me-2"></i><strong>Author:</strong> John Doe</p>
                                    <p className="card-text mb-0"><i className="bi bi-tag me-2"></i><strong>Genre:</strong> Fiction</p>
                                </div>
                                <button className={`btn ${classBorrowCart.btnDangerModern} btn-sm`}><i className="bi bi-x-circle"></i> Remove</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className={`card ${classBorrowCart.summaryCard}`}>
                            <div className="card-body text-center p-4">
                                <h5 className="text-white mb-3"><i className="bi bi-receipt me-2"></i>Cart Summary</h5>
                                <p className="mb-2"><strong>Total Books:</strong> 2</p>
                                <p className="mb-3"><strong>Borrow Period:</strong> 14 days</p>
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
            />
        </>
    )
}

export default BorrowCart;