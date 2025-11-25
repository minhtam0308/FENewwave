import { useEffect, useState } from "react";
import axios from '../../config/axiosConfig.js';
import ClassBook from '../css/BookManage.module.scss'
import '../css/generalCss.scss'
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import ConvertTosBase64Handle from "../../commonHandle/ConvertTosBase64Handle.js";

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

    const handleCloseModalCreateBook = () => {
        setShowModalCreateBook(false);
        setTitle("");
        setAuthor("");
        setDes("");
        setTotal();
        setImage("");
    }

    useEffect(() => {
        const getAllAuthor = async () => {
            try {
                const allAuthor = await axios.get(`/api/Author/getAllAuthor`);
                // console.log(allAuthor);
                setListAuthor(allAuthor);
                setAuthor(allAuthor[0]?.id);
            } catch (e) {
                console.log(e);
            }

        }
        getAllAuthor();

    }, [reload]);

    const handleChangImage = () => {

    }

    const handleAddBook = async () => {
        if (!title || !author || !total) {
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
            if (resultCreateImage?.ec !== 0) {
                toast.error(resultCreateImage?.em);
                return;
            } else {
                UrlBook = resultCreateImage.em
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
        if (resultCreateImage?.ec === 0) {
            toast.success(resultCreateImage?.em);
            handleCloseModalCreateBook();
        } else {
            toast.error(resultCreateImage?.em);
            return;
        }
    }
    return (<div className={`${ClassBook.container} container mt-5`}>
        <div className={`${ClassBook.container} container`}>
            <h1><i className="fas fa-book"></i> Book Manager</h1>
            <div className={`${ClassBook.controls}`}>
                <div className={`${ClassBook.searchBar}`}>
                    <input className={`${ClassBook.input} mb-2`} type="text" id="search" placeholder="Search books..." oninput="filterBooks()" />
                </div>
                <button
                    className={`${ClassBook.button}`}
                    onClick={() => {
                        setShowModalCreateBook(true);
                    }}
                ><i className={`fas fa-plus`}></i> Add Book</button>
            </div>
            <table id={`${ClassBook.bookTable}`}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="${book.image}" alt="${book.title}" className="book-image" /></td>
                        <td>asdas</td>
                        <td>asd</td>
                        <td>asdasd</td>
                        <td className={`${ClassBook.actions}`}>
                            <button className={`${ClassBook.button} ${ClassBook.editBtn} `} onclick="openModal(${index})"><i className="bi bi-pencil-square"></i> Edit</button>
                            <button className={` ${ClassBook.button} ${ClassBook.deleteBtn}`} onclick="deleteBook(${index})"><i className="bi bi-trash"></i> Delete</button>
                        </td>
                    </tr>
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
                    <label htmlFor="isbn" className="form-label btn btn-primary"><i class="bi bi-plus-circle me-2"></i>Image</label>
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
    </div>)
}

export default BookManage;