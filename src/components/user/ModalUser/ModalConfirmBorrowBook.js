import { useEffect, useState } from "react";
import { Button, ListGroup, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from '../../../config/axiosConfig.js';

const ModalConfirmBorrowBook = ({ show, setShow, listBook, listImage, key, reload, setReload }) => {

    const [loading, setLoading] = useState(false);
    const [dateBorrow, setDateBorrow] = useState(new Date().toISOString().split("T")[0]);
    const [numberBorrowDays, setNumberBorrowDays] = useState(1);

    const handleClose = () => {
        setShow(false);
    }

    const listBooks = listBook?.map((val) => {
        return { idBook: val.id, quantity: val.quantity }
    })

    const handleConfirmBorrow = async () => {
        if (!listBook || listBook.length === 0) {
            toast.warning("You have no book to borrow!");
            return;
        }

        if (new Date(dateBorrow) < new Date()) {
            toast.warning("Borrow date is not valid!");
            return;
        }

        if (numberBorrowDays < 1) {
            toast.warning("Number date borrow is not valid!");
            return;
        }

        const resultBorrowBook = await axios.post(`/api/BorrowBooks/borrow-book`, {
            listBooks,
            expiresBorrow: dateBorrow,
            numberBorrowDate: numberBorrowDays
        });
        if (resultBorrowBook.errorCode === 201) {
            toast.success(resultBorrowBook.errorMessage);
            handleClose();

            if (key === "cart") {
                setReload(!reload);
            }
            return;
        } else {
            toast.error(resultBorrowBook.errorMessage);
            handleClose();
        }
    }
    return (<>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Borrow Books</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card-body">
                    <h5>Your Cart:</h5>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Book Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody id="cartItems">
                            {listBook && listBook.map((val, item) => {
                                return (<tr>
                                    <td>
                                        <div>
                                            <img alt="The Great Gatsby" className="img-fluid"
                                                style={{
                                                    height: "50px",
                                                    maxWidth: "50px",
                                                    objectFit: "cover"
                                                }}
                                                src={`${listImage[val.urlBook]}`}
                                            />
                                        </div>
                                    </td>


                                    <td>{val.title}</td>
                                    <td>{val.nameAuthor}</td>

                                    <td>{val.quantity}</td>
                                </tr>)

                            })}

                        </tbody>
                    </table>
                    <hr />
                    <div className="mb-3">
                        <label for="borrowDate" className="form-label">Borrow Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="borrowDate"
                            value={dateBorrow}
                            onChange={(event) => {
                                // console.log(event.target.value);
                                setDateBorrow(event.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="returnDate" className="form-label">number of borrowing days</label>
                        <input
                            type="number"
                            className="form-control"
                            id="returnDate"
                            value={numberBorrowDays}
                            onChange={(event) => {
                                setNumberBorrowDays(event.target.value);
                            }}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={() => {
                    handleClose();
                }}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    disabled={loading}
                    onClick={() => {
                        handleConfirmBorrow();
                    }}
                >
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                className="me-2"
                            />
                            Loading...
                        </>
                    ) : (
                        "Ok"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    </>)

}
export default ModalConfirmBorrowBook;