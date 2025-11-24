import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig.js';
import { toast } from 'react-toastify';
const AuthorManage = () => {
    const [listAuthor, setListAuthor] = useState();
    const [reload, setReload] = useState(false);
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
    let authors = [
        { id: 1, name: "J.K. Rowling", bio: "Author of Harry Potter series.", birthDate: "1965-07-31", nationality: "British", genres: ["Fiction"], image: "" },
        { id: 2, name: "Agatha Christie", bio: "Queen of mystery novels.", birthDate: "1890-09-15", nationality: "British", genres: ["Mystery"], image: "" }
    ];

    // Render author list


    // Reset modal for new author
    function resetModal() {
        document.getElementById('authorId').value = '';
        document.getElementById('authorName').value = '';
        document.getElementById('authorModalLabel').textContent = 'Add New Author';
    }

    // Edit author (populate modal)
    function editAuthor(id) {
        const author = listAuthor.find(a => a.id === id);
        if (author) {
            document.getElementById('authorId').value = author.id;
            document.getElementById('authorName').value = author.nameAuthor;
            document.getElementById('authorModalLabel').textContent = 'Edit Author';
            new bootstrap.Modal(document.getElementById('authorModal')).show();
        }
    }

    // Delete author
    async function deleteAuthor(id) {
        if (window.confirm('Are you sure you want to delete this author?')) {
            authors = authors.filter(a => a.id !== id);
            if (id) {
                const create = await axios.delete(`/api/Author/deleteAuthor?idAuthor=${id}`)
                // console.log(id)
                toast.success(create);
                setReload(!reload);
            }

        }
    }

    // Save author (create or update)
    async function saveAuthor() {
        const form = document.getElementById('authorForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const id = document.getElementById('authorId').value;
        const author = {
            id: id ? id : Date.now(), // Simple ID generation
            name: document.getElementById('authorName').value
        };
        if (id) {
            // Update
            if (listAuthor.find(a => a.nameAuthor === author.name)) {
                toast.error("This name is exist");
                return;
            }
            const create = await axios.put(`/api/Author/putEditAuthor`, {
                id: author.id,
                nameAuthor: author.name
            });
            toast.success(create);
            window.location.reload();

        } else {
            // Create  
            if (listAuthor.find(a => a.nameAuthor === author.name)) {
                toast.error("This name is exist");
                return;
            }
            // console.log(author);
            document.getElementById('authorName').value = "";
            const create = await axios.post(`/api/Author/postCreateAuthor?name=${author.name}`);
            toast.success(create);
            setReload(!reload);

        }

    }





    // Initialize

    return (<>
        <div className="container mt-4">
            <h1 className="mb-4 text-center"><i className="bi bi-book"></i> Author Management</h1>

            <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#authorModal" onClick={resetModal}>
                <i className="bi bi-plus-circle"></i> Add New Author
            </button>
            <div className="row" id="authorList">
                {listAuthor && listAuthor.map((item, index) => {
                    return (<div className="col-md-6 author-card" key={`card${index}`}>
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">{item.nameAuthor}</h5>
                                <button className="btn btn-sm btn-outline-primary m-2" onClick={() => { editAuthor(item.id) }}>Edit</button>
                                <button className="btn btn-sm btn-outline-danger m-2" onClick={() => { deleteAuthor(item.id) }}>Delete</button>
                            </div>
                        </div>
                    </div>)
                })}

            </div>
        </div>
        <div className="modal fade" id="authorModal" aria-labelledby="authorModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="authorModalLabel">Add New Author</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <form id="authorForm">
                            <input type="hidden" id="authorId" />
                            <div className="mb-3">
                                <label className="form-label">Author Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="authorName" placeholder="e.g., J.K. Rowling" required />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            id="saveAuthorBtn"
                            onClick={saveAuthor}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default AuthorManage;