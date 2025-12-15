import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";


const ModalConfirmDelPro = (props) => {

    const { show, setShow, delValue, imageDel, setReload, reload } = props;
    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleDelBook = () => {
        console.log(delValue.id);
    }
    return (<>
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
    </>)
}

export default ModalConfirmDelPro;