import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from '../../../config/axiosConfig.js';

const ImportBookModal = (props) => {
    const { show, setShow, setReload, reload } = props;
    const handleClose = () => {
        setShow(false);
    }
    const [loading, setLoading] = useState(false);

    const handleDelBook = async () => {


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
                    <Modal.Title>Import File Excel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="card-body">
                        <form id="uploadForm">
                            <div class="mb-3">
                                <label for="excelFile" class="form-label">Chọn file Excel (.xlsx hoặc .xls)</label>
                                <input type="file" class="form-control" id="excelFile" accept=".xlsx,.xls" required />
                            </div>
                        </form>
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
                        variant="success"
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
                            "Import"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ImportBookModal;