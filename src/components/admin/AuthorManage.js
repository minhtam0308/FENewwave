
import { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig.js';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
const AuthorManage = () => {
    const [listAuthor, setListAuthor] = useState();
    const [reload, setReload] = useState(false);

    const [newNameAuthor, setneuNameAuthor] = useState("");
    const [showModalAddAuthor, setShowModalAddAuthor] = useState(false);
    const handleCloseModalAddAuthor = () => {
        setShowModalAddAuthor(false);
        setneuNameAuthor('');
    }
    const handleShowModalAddAuthor = () => setShowModalAddAuthor(true);


    const [idEditAuthor, setIdEditAuthor] = useState('');
    const [editNameAuthor, setEditNameAuthor] = useState('');
    const [showModalEditAuthor, setShowModalEditAuthor] = useState('');
    const handleCloseModalEditAuthor = () => {
        setShowModalEditAuthor(false);
        setEditNameAuthor('');
        setIdEditAuthor('');
    }
    const handleShowModalEditAuthor = () => setShowModalEditAuthor(true);


    const [idDelAuthor, setIdDelAuthor] = useState('');
    const [showModalDelAuthor, setShowModalDelAuthor] = useState('');
    const handleCloseModalDelAuthor = () => {
        setShowModalDelAuthor(false);
        setIdDelAuthor('');
    }




    useEffect(() => {
        const getAllAuthor = async () => {
            try {
                const allAuthor = await axios.get(`/api/Author/getAllAuthor`);
                console.log(allAuthor);
                setListAuthor(allAuthor);
            } catch (e) {
                console.log(e);
            }
        }
        getAllAuthor();

    }, [reload]);

    const handleAddNewAuthor = async () => {
        const apiCreateAuthor = await axios.post(`/api/Author/postCreateAuthor?name=${newNameAuthor}`);
        if (apiCreateAuthor?.ec === 0) {
            toast.success(apiCreateAuthor?.em);
            setShowModalAddAuthor(false);
            setReload(!reload);
        } else {
            toast.error(apiCreateAuthor?.em);
        }
    }

    const handleEditAuthor = async () => {
        // console.log(id)
        const apiEditAuthor = await axios.put(`/api/Author/putEditAuthor`, { id: idEditAuthor, nameAuthor: editNameAuthor });
        if (apiEditAuthor?.ec === 0) {
            toast.success(apiEditAuthor?.em);
            setShowModalEditAuthor(false);
            setReload(!reload);
        } else {
            toast.error(apiEditAuthor?.em);
        }
    }

    const handleDelAuthor = async () => {

        const apiDelAuthor = await axios.delete(`api/Author/deleteAuthor?idAuthor=${idDelAuthor}`);
        if (apiDelAuthor?.ec === 0) {
            toast.success(apiDelAuthor?.em);
            setShowModalDelAuthor(false);
            setReload(!reload);
        } else {
            toast.error(apiDelAuthor?.em);
        }
    }

    return (<>
        <div className="container mt-4">
            <h1 className="mb-4 text-center"><i className="bi bi-book"></i> Author Management</h1>

            <button type="button" className="btn btn-primary mb-3" onClick={() => { handleShowModalAddAuthor() }}>
                <i className="bi bi-plus-circle"></i> Add New Author
            </button>
            <div className="row" id="authorList">
                {listAuthor && listAuthor.map((item, index) => {
                    return (<div className="col-md-6 author-card" key={`card${index}`}>
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">{`${item.nameAuthor} ( ${item.id} )`}</h5>
                                <button className="btn btn-sm btn-outline-primary m-2" onClick={() => {
                                    setEditNameAuthor(item.nameAuthor);
                                    handleShowModalEditAuthor();
                                    setIdEditAuthor(item.id);
                                }}>Edit</button>
                                <button className="btn btn-sm btn-outline-danger m-2" onClick={() => {
                                    setIdDelAuthor(item.id);
                                    setShowModalDelAuthor(true);
                                }}>Delete</button>
                            </div>
                        </div>
                    </div>)
                })}

            </div>
        </div>
        <Modal show={showModalAddAuthor} onHide={handleCloseModalAddAuthor}>
            <Modal.Header closeButton>
                <Modal.Title>Add author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label >Name author</label>
                    <input
                        type="test"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter name"
                        value={newNameAuthor}
                        onChange={(e) => {
                            setneuNameAuthor(e.target.value);
                        }}
                    />
                    <small id="emailHelp" className="form-text text-muted">This name is a new author.</small>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalAddAuthor}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddNewAuthor} disabled={newNameAuthor === ""}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showModalEditAuthor} onHide={handleCloseModalEditAuthor}>
            <Modal.Header closeButton>
                <Modal.Title>Edit author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label >Name author</label>
                    <input
                        type="test"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter name"
                        value={editNameAuthor}
                        onChange={(e) => {
                            setEditNameAuthor(e.target.value);
                        }}
                    />
                    <small id="emailHelp" className="form-text text-muted">This name is a old author.</small>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalEditAuthor}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditAuthor} disabled={editNameAuthor === ""}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showModalDelAuthor} onHide={handleCloseModalDelAuthor}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure delete this user?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalDelAuthor}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelAuthor}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}
export default AuthorManage;