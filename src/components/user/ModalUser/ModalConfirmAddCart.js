import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useUserContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import axios from '../../../config/axiosConfig.js';

const ModalConfirmAddCart = ({ show, setShow, productInfor, image }) => {

    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const handleClose = () => {
        setShow(false);
    }
    // console.log(productInfor);
    const handleAddToCart = async () => {
        if (quantity < 1 || quantity > productInfor.availableCopies) {
            toast.warning("Out of available copies");
            return;
        }
        //idBook, quantity
        const resAddToCart = await axios.post('/api/Cart/addBookToCart', {
            idBook: productInfor.id,
            quantity: quantity
        })
        if (resAddToCart?.ec === 0) {
            toast.success(resAddToCart.em);
        } else {
            toast.error(resAddToCart?.em);
        }
        console.log(resAddToCart);
        handleClose();
    }
    return (<>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add to cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body">

                    <div className="row">
                        <div className="col-md-4">
                            <img src={image} className="img-fluid" alt="Product Image" />
                        </div>
                        <div className="col-md-8">
                            <h4>{productInfor.title}</h4>
                            <p><strong>Availability:</strong> {productInfor.availableCopies}</p>
                        </div>
                    </div>


                    <h5>Description</h5>
                    <p>{productInfor.description}</p>


                    <h5>Author</h5>
                    <p>{productInfor.nameAuthor}</p>


                    <div className="mt-3">
                        <label for="quantityInput" className="form-label"><strong>Quantity:</strong></label>
                        <input type="number" className="form-control" id="quantityInput"
                            min="1"
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(e.target.value);
                            }}
                            style={{ width: "100px" }} />
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
                    onClick={handleAddToCart}
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
                        "Add to cart"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    </>)

}

export default ModalConfirmAddCart;