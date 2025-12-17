import { useEffect, useState } from "react";
import axios from '../../config/axiosConfig.js';
import ClassBook from '../css/BookManage.module.scss'
import '../css/generalCss.scss'
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import ConvertTosBase64Handle from "../../commonHandle/ConvertTosBase64Handle.js";
import EditBookModal from "./ModalOfBookManage/EditBookModal.js";
import DeleteBookModal from "./ModalOfBookManage/DeleteBookModal.js";

const BookManage = () => {
    const [listAuthor, setListAuthor] = useState();
    const [reload, setReload] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [des, setDes] = useState("");
    const [total, setTotal] = useState();

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showModalCreateBook, setShowModalCreateBook] = useState(false);

    const [showModalEditBook, setShowModalEditBook] = useState(false);
    const [editValue, setEditValue] = useState({});

    const [showModalDelBook, setShowModalDelBook] = useState(false);
    const [delValue, setDetDelVal] = useState({});


    const [listBook, setListBook] = useState([]);
    const [listImage, setListImage] = useState({});

    const [keySearch, setKeySearch] = useState('');
    const listBookFilter = listBook.filter(b => b.title.toLowerCase().includes(keySearch.toLowerCase())
        || b.nameAuthor.toLowerCase().includes(keySearch.toLowerCase()));


    const handleCloseModalCreateBook = () => {
        setShowModalCreateBook(false);
        setTitle("");
        setAuthor("");
        setDes("");
        setTotal();
        setImage("");
    }

    useEffect(() => {
        const getAllBook = async () => {
            try {
                const allBook = await axios.get(`/api/Book/getAllBook`);
                // console.log("allbook", allBook);
                if (allBook?.errorCode === 0) {
                    setListBook(allBook?.data);
                    return;
                }
                setListBook([]);
                toast.error("Cannot get data");

            } catch (e) {
                console.log(e);
            }
        }
        const getAllAuthor = async () => {
            try {
                const allAuthor = await axios.get(`/api/Author/getAllAuthor`);
                // console.log("auythor", allAuthor);
                if (allAuthor?.errorCode === 0) {
                    setListAuthor(allAuthor?.data);
                    setAuthor(allAuthor.data[0]?.id);
                    return;
                }
                toast.error(allAuthor?.errorMessage);
                setListAuthor([]);

            } catch (e) {
                console.log(e);
            }
        }
        getAllAuthor();
        getAllBook();
    }, [reload]);

    useEffect(() => {
        const getImage = async (idImage) => {
            try {
                const resultImage = await axios.get(`/api/Image/getImage?idImage=${idImage}`, { responseType: "blob" });
                // console.log(resultImage);

                if (listImage[idImage]) {
                    URL.revokeObjectURL(listImage[idImage]);
                }
                try {
                    setListImage(pre => ({ ...pre, [idImage]: URL.createObjectURL(resultImage) }));

                } catch (e) {
                    console.log(e);
                }


            } catch (e) {
                console.log(e);
            }
        }
        const getAllImage = async () => {
            for (let bookInfor of listBook) {
                if (bookInfor.urlBook) {
                    await getImage(bookInfor.urlBook);
                }
            }
        }
        getAllImage();

    }, [listBook])


    const handleAddBook = async () => {
        if (!title || !author || !total) {
            // console.log(title, author, total);
            toast.warning("Fill title, author and totalcopies");
            return;
        }
        let UrlBook = "";
        if (image) {
            let form = new FormData();
            form.append("file", image);
            const resultCreateImage = await axios.post(`/api/Image/postCreateImage`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (resultCreateImage?.errorCode !== 0) {
                toast.error(resultCreateImage?.errorMessage);
                return;
            } else {
                UrlBook = resultCreateImage.data
            }
        }

        const bookinfor = {
            title: title,
            description: des,
            idAuthor: author,
            totalCopies: total,
            urlBook: UrlBook
        }
        const resultCreateImage = await axios.post(`/api/Book/postCreateBook`, bookinfor);
        if (resultCreateImage?.errorCode === 0) {
            toast.success(resultCreateImage?.errorMessage);
            handleCloseModalCreateBook();
            setReload(!reload);
        } else {
            toast.error(resultCreateImage?.errorMessage);
            return;
        }
    }
    // console.log(listBook);
    return (<div className={`${ClassBook.container} container mt-5 mb-3`}>
        <div className={`${ClassBook.container} container`}>
            <h1><i className="fas fa-book"></i> Book Manager</h1>
            <div className={`${ClassBook.controls}`}>
                <div className={`${ClassBook.searchBar}`}>
                    <input
                        className={`${ClassBook.input} mb-2`}
                        type="text" id="search" placeholder="Search books..."
                        value={keySearch}
                        onChange={(e) => {
                            setKeySearch(e.target.value);
                        }
                        }
                    />
                </div>
                <button
                    className={`${ClassBook.button}`}
                    onClick={() => {
                        setShowModalCreateBook(true);
                    }}
                ><i className={`fas fa-plus`}></i> Add Book</button>
            </div>
            <table id={`${ClassBook.bookTable} mb-3`}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Total copies</th>
                        <th>Available copies</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listBookFilter?.map((val, index) => {
                        // console.log("val", listImage[val.image])
                        return (
                            <tr key={`book${index}`}>
                                <td><img
                                    src={listImage[val.urlBook]}
                                    alt="have no image"
                                    className="book-image img-thumbnail"
                                    style={{ width: "200px", height: "100px" }}
                                /></td>
                                <td>{val.title}</td>
                                <td>{val.nameAuthor}</td>
                                <td>{val.description}</td>
                                <td>{val.totalCopies}</td>
                                <td>{val.availableCopies}</td>
                                <td>
                                    <div className={`${ClassBook.actions}`}>
                                        <button className={`${ClassBook.button} ${ClassBook.editBtn} `}
                                            onClick={() => {
                                                setShowModalEditBook(true);
                                                setEditValue(val);

                                            }}
                                        ><i className="bi bi-pencil-square"></i> Edit</button>
                                        <button className={` ${ClassBook.button} ${ClassBook.deleteBtn}`}
                                            onClick={() => {
                                                setShowModalDelBook(true);
                                                setDetDelVal(val);
                                            }}

                                        ><i className="bi bi-trash"></i> Delete</button>
                                    </div>
                                </td>
                            </tr>)
                    })}

                </tbody>
            </table>
        </div>

        <Modal
            show={showModalCreateBook}
            onHide={handleCloseModalCreateBook}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Crate new Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
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
                        value={des}
                        onChange={(e) => {
                            setDes(e.target.value);
                        }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <select className="form-select" id="genre"
                        value={author}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                        }
                        }
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
                        value={total}
                        onChange={(e) => {
                            setTotal(e.target.value)
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="isbn" className="form-label btn btn-primary"><i className="bi bi-plus-circle me-2"></i>Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="isbn" hidden
                        onChange={async (e) => {
                            setImage(e.target.files[0]);
                        }}
                    />

                    {image &&
                        <div className="text-center">
                            <img src={URL.createObjectURL(image)} alt="book" className="book-image"
                                style={{ width: "200px", height: "100px", borderRadius: "5px", objectFit: "cover" }} />
                        </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalCreateBook}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    disabled={loading}
                    onClick={handleAddBook}
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
                        "Add book"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
        <EditBookModal
            show={showModalEditBook}
            setShow={setShowModalEditBook}
            editValue={editValue}
            reload={reload}
            setReload={setReload}
            listAuthor={listAuthor}
            imageEdit={listImage[editValue.urlBook]}
        />
        <DeleteBookModal
            show={showModalDelBook}
            setShow={setShowModalDelBook}
            delValue={delValue}
            imageDel={listImage[delValue.urlBook]}
            reload={reload}
            setReload={setReload}
        />

    </div>)
}

export default BookManage;