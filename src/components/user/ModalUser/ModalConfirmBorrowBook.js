import { useEffect, useState } from "react";
import { Button, ListGroup, Modal, Spinner } from "react-bootstrap";
import { useUserContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import axios from '../../../config/axiosConfig.js';

const ModalConfirmBorrowBook = ({ show, setShow, listBook, listImage }) => {

    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        setShow(false);
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
                        <input type="date" className="form-control" id="borrowDate" value="2023-10-01" />
                    </div>
                    <div className="mb-3">
                        <label for="returnDate" className="form-label">number of borrowing days</label>
                        <input type="number" className="form-control" id="returnDate" />
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
                // onClick={ }
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