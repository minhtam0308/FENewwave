import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from '../../../config/axiosConfig.js';

const DeleteBookModal = (props) => {
    const { show, setShow, delValue, imageDel, setReload, reload } = props;
    const handleClose = () => {
        setShow(false);
    }
    const [loading, setLoading] = useState(false);

    const handleDelBook = async () => {
        setLoading(true);
        //delete Image
        if (delValue.urlBook) {
            const resultDelImage = await axios.delete(`/api/Image/deleteImage?idImage=${delValue.urlBook}`);
            if (resultDelImage?.ec !== 0) {
                toast.error(resultDelImage?.em);
                return;
            }

        }

        const resultDelBook = await axios.delete(`/api/Book/delBook?idBook=${delValue.id}`);
        if (resultDelBook?.ec === 0) {
            toast.success(resultDelBook?.em);
            handleClose();
            setLoading(false);
            setReload(!reload);
            return;
        } else {
            toast.error(resultDelBook?.em);
        }
        setLoading(false);

    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are your sure delete this book?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        {(imageDel) &&
                            <div className="text-center">
                                <img src={`${imageDel}`} alt="book" className="book-image"
                                    style={{ width: "200px", height: "100px", borderRadius: "5px", objectFit: "cover" }} />
                            </div>}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShow(false);
                        handleClose();
                    }}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        disabled={loading}
                        onClick={handleDelBook}
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
                            "Delete"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteBookModal;