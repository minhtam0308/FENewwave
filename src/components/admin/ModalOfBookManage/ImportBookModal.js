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
    const [excelFile, setExcelFile] = useState();

    const handleImportFile = async () => {
        if (excelFile) {
            let form = new FormData();
            form.append("file", excelFile);
            setLoading(true);
            const resultImport = await axios.post(`/api/Book/addByExcel`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (resultImport?.errorCode === 201) {
                toast.success(resultImport?.errorMessage);
                setLoading(false);
                handleClose();
                setReload(!reload);
                return;
            } else {
                toast.error(resultImport?.errorMessage);
                setLoading(false);
                return;
            }
        } else {
            toast.warning("Import your file");
            console.log(excelFile);
            return;
        }
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
                    <div className="card-body">
                        <form id="uploadForm">
                            <div className="mb-3">
                                <label for="excelFile" className="form-label">Chọn file Excel (.xlsx hoặc .xls)</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="excelFile"
                                    accept=".xlsx,.xls"
                                    required
                                    onChange={(event) => {
                                        setExcelFile(event.target.files[0])
                                    }}
                                />
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
                        onClick={handleImportFile}
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