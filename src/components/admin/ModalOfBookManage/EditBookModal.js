import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from '../../../config/axiosConfig.js';


const EditBookModal = (props) => {
    const { show, setShow, editValue, listAuthor, imageEdit, setReload, reload } = props;
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);

    }

    const [data, setData] = useState({});
    const [image, setImage] = useState('');

    useEffect(() => {
        setData({
            Id: editValue.id,
            title: editValue.title,
            description: editValue.description,
            idAuthor: editValue.idAuthor,
            totalCopies: editValue.totalCopies,
            availableCopies: editValue.availableCopies,
            urlBook: editValue.urlBook
        })
        setImage();
    }, [editValue])

    // console.log(imageEdit);

    const handleEditBook = async () => {
        if (!data.title
            || !data.idAuthor || data.totalCopies === '' || !data.availableCopies === ''
            || data.totalCopies < data.availableCopies
        ) {
            toast.warning("fill all data and validation");
            return;
        }
        let urlBook = data.urlBook;
        setLoading(true);
        if (image) {
            if (!data.urlBook) {
                let form = new FormData();
                form.append("file", image);
                console.log(data.urlBook);
                const resultCreateImage = await axios.post(`/api/Image/postCreateImage`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });

                if (resultCreateImage?.errorCode !== 201) {
                    toast.error(resultCreateImage?.errorMessage);
                    return;
                }
                urlBook = resultCreateImage.data;
            } else {
                let form = new FormData();
                form.append("file", image);
                form.append("idImage", urlBook);
                const resultCreateImage = await axios.put(`/api/Image/putImage`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });

                if (resultCreateImage?.errorCode !== 201) {
                    toast.error(resultCreateImage?.errorMessage);
                    return;
                }
            }
        }
        //put edit book
        const resultPutbook = await axios.put(`/api/Book/putBook`, { ...data, urlBook: urlBook });
        if (resultPutbook?.errorCode === 201) {
            toast.success(resultPutbook?.errorMessage);
            handleClose();
            setReload(!reload);
            setLoading(false);
        } else {
            toast.error(resultPutbook?.errorMessage);
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
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={data.title}
                            onChange={(e) => {
                                setData(pre => ({ ...pre, title: e.target.value }))
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            shape="text"
                            type="text"
                            className="form-control"
                            id="author"
                            value={data.description}
                            onChange={(e) => {
                                setData(pre => ({ ...pre, description: e.target.value }))
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <select className="form-select" id="genre"
                            value={data.idAuthor}
                            onChange={(e) => {
                                setData(pre => ({ ...pre, idAuthor: e.target.value }))
                            }}
                        >
                            {listAuthor?.map((val, index) => {
                                return (
                                    <option value={val.id} key={`indexval${index}`}>{`${val.nameAuthor} ( ${val.id} )`}</option>

                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Total Books</label>
                        <input
                            type="number"
                            className="form-control"
                            id="title"
                            value={data.totalCopies}
                            onChange={(e) => {
                                setData(pre => ({ ...pre, totalCopies: e.target.value }))

                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Available Books</label>
                        <input
                            type="number"
                            className="form-control"
                            id="title"
                            value={data.availableCopies}
                            onChange={(e) => {
                                setData(pre => ({ ...pre, availableCopies: e.target.value }))

                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label btn btn-primary"><i className="bi bi-plus-circle me-2"></i>Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="isbn" hidden
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}
                        />
                        {(image || imageEdit) &&
                            <div className="text-center">
                                <img src={`${image ? URL.createObjectURL(image) : imageEdit}`} alt="book" className="book-image"
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
                        variant="primary"
                        disabled={loading}
                        onClick={handleEditBook}
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
                            "Save book"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditBookModal;