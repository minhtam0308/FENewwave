import { useEffect, useState } from "react";
import axios from '../../config/axiosConfig.js';

const BookManage = () => {
    const [listAuthor, setListAuthor] = useState();
    const [reload, setReload] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [des, setDes] = useState("");
    const [total, setTotal] = useState(0);
    const [available, setAvailable] = useState(0);
    const [image, setImage] = useState("");

    useEffect(() => {
        const getAllAuthor = async () => {
            try {
                const allAuthor = await axios.get(`/api/Author/getAllAuthor`);
                console.log(allAuthor);
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
        const bookinfor = {
            Title: title,
            IdAuthor: author,
            Description: des,
            TotalCopies: total,
            AvailableCopies: available,
            ImageBook: image
        }
        console.log(bookinfor);
    }
    return (<div class="container mt-5">
        <h1 class="text-center mb-4">Book Manage</h1>


        <div class="card mb-5">
            <div class="card-header">
                <h5>Add/Edit Books</h5>
            </div>
            <div class="card-body">
                <form id="bookForm">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="title" class="form-label">Title:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="title"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label
                                    for="author"
                                    class="form-label"
                                    onChange={(e) => {
                                        setAuthor(e.target.value);
                                    }}
                                >Author:</label>
                                <select class="form-control" id="author" >
                                    {listAuthor?.map((val, index) => {
                                        return (
                                            <option key={`indexa${index}`} value={val.id}>{val.nameAuthor}</option>

                                        )
                                    })}

                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <label class="form-label">Description:</label>
                        <textarea
                            class="form-control"
                            id="description"
                            rows="3"
                            value={des}
                            onChange={(e) => {
                                setDes(e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group mb-3">
                                <label class="form-label">TotalCopies:</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="totalCopies"
                                    min="1"
                                    value={total}
                                    onChange={(e) => {
                                        setTotal(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group mb-3">
                                <label class="form-label">AvailableCopies:</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="availableCopies"
                                    min="0"
                                    value={available}
                                    onChange={(e) => {
                                        setAvailable(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group mb-3 text-center">
                                <label htmlFor="image" class="form-label btn btn-primary">Add Image</label>
                                <input
                                    type="file"
                                    class="form-control"
                                    id="image" accept="image/*"
                                    hidden
                                    onChange={(e) => {
                                        handleChangImage(e)
                                    }}
                                />
                            </div>
                        </div>
                        <div class="col-md-3 border">
                            <div class="form-group mb-3">
                                <img src="" />
                            </div>
                        </div>
                    </div>
                </form>
                <button
                    class="btn btn-primary"
                    onClick={handleAddBook}
                >Thêm Sách</button>
            </div>
        </div>


        <div class="card mb-5">
            <div class="card-header">
                <h5>Danh sách Sách</h5>
            </div>
            <div class="card-body">
                <table class="table table-striped table-bordered" id="bookTable">
                    <thead class="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>TotalCopies</th>
                            <th>AvailableCopies</th>
                            <th>Image</th>
                            <th>CreatedAt</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>)
}

export default BookManage;