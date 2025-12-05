import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useUserContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import axios from '../../../config/axiosConfig.js';

const ModalConfirmBorrowBook = ({ show, setShow }) => {

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
                <div class="card-body">
                    <h5>Your Cart:</h5>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Book Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody id="cartItems">
                            <tr>
                                <td>
                                    <div>
                                        <img src="blob:http://localhost:3000/0d7c9165-9464-4be0-98f2-3e756460cd33" alt="The Great Gatsby" class="img-fluid"
                                            style={{
                                                height: "50px",
                                                maxWidth: "50px",
                                                objectFit: "cover"
                                            }} />
                                    </div>
                                </td>
                                <td>The Great Gatsby</td>
                                <td>F. Scott Fitzgerald</td>

                                <td>1</td>
                            </tr>
                            <tr>
                                <td><img src="blob:http://localhost:3000/cdcf6eb9-5ee5-497e-92ef-288f17e1c01f" alt="The Great Gatsby" class="img-fluid" style={{ maxWidth: "50px" }} /></td>
                                <td>The Great Gatsby</td>

                                <td>1</td>
                            </tr>
                            <tr>
                                <td><img src="blob:http://localhost:3000/cdcf6eb9-5ee5-497e-92ef-288f17e1c01f" alt="The Great Gatsby" class="img-fluid" style={{ maxWidth: "50px" }} /></td>
                                <td>The Great Gatsby</td>
                                <td>F. Scott Fitzgerald</td>
                                <td>1</td>
                            </tr>

                        </tbody>
                    </table>
                    <hr />
                    <div class="mb-3">
                        <label for="borrowDate" class="form-label">Borrow Date</label>
                        <input type="date" class="form-control" id="borrowDate" value="2023-10-01" />
                    </div>
                    <div class="mb-3">
                        <label for="returnDate" class="form-label">number of borrowing days</label>
                        <input type="number" class="form-control" id="returnDate" />
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