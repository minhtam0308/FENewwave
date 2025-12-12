import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useUserContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import axios from '../../../config/axiosConfig.js';


const ModalEditUser = (props) => {
    const [loading, setLoading] = useState(false);
    const { userContext, imageContext } = useUserContext();
    const [user, setUser] = useState(userContext);
    const [image, setImage] = useState(imageContext);
    const [fileImage, setFileImage] = useState();
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setFileImage();
    }
    useEffect(() => {
        setUser(userContext);
        setImage(imageContext);
    }, [show])
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(pre => ({ ...pre, [name]: value }))
        // console.log(user);
    }

    const handleSaveChange = async () => {
        if (!user.name) {
            toast.warning("Fill your name!");
            return;
        }
        let resultCreateImage;
        if (fileImage) {
            if (user.urlUserImage !== '258d5e1a-ff57-4092-2a5d-08de2e43c05d') {
                let form = new FormData();
                form.append("file", fileImage);
                form.append("idImage", user.urlUserImage);
                const resultPutImage = await axios.put(`/api/Image/putImage`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                if (resultPutImage?.ec !== 0) {
                    toast.error(resultPutImage?.em);
                    return;
                }
            } else {
                let form = new FormData();
                form.append("file", fileImage);
                resultCreateImage = await axios.post(`/api/Image/postCreateImage`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });

                if (resultCreateImage?.ec !== 0) {
                    toast.error(resultCreateImage?.em);
                    return;
                }
            }
        }

        let resultChangeUser;
        if (resultCreateImage) {
            resultChangeUser = await axios.put('/api/User/putChangeUser', { ...user, urlUserImage: resultCreateImage.em });

        } else {
            resultChangeUser = await axios.put('/api/User/putChangeUser', user);

        }
        if (resultChangeUser?.ec === 0) {
            toast.success(resultChangeUser?.em);
            handleClose();
            window.location.reload();
            return;
        }
        toast.error(resultChangeUser?.em);
        return;
    }


    return (<>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Your Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <div className="text-center">
                        <img src={fileImage ? URL.createObjectURL(fileImage) : image} alt="User Image"
                            className={`rounded-circle mb-4`} style={{ "width": "150px", "height": "150px" }} />
                    </div>
                    <div className="text-center">
                        <label className="btn btn-primary" htmlFor="imageChange">Chang Image</label>
                        <input
                            type="file"
                            id="imageChange" hidden
                            onChange={(e) => {
                                setFileImage(e.target.files[0]);
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="editName" className="form-label">Name</label>
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            id="editName"
                            value={user?.name}
                            onChange={(e) => handleChange(e)}

                        />
                    </div>
                    <div className="mb-3">
                        <label for="editEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="editEmail" disabled
                            value={user?.email} />
                    </div>
                    <div className="mb-3">
                        <label for="editAge" className="form-label">Age</label>
                        <input
                            name="age"
                            type="number"
                            className="form-control"
                            id="editAge"
                            value={user?.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="editLocation" className="form-label">Location</label>
                        <input
                            name="location"
                            type="text"
                            className="form-control"
                            id="editLocation"
                            value={user?.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="editLocation" className="form-label">Department</label>
                        <input
                            name="department"
                            type="text"
                            className="form-control"
                            id="editLocation"
                            value={user?.department}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="editLocation" className="form-label">Class</label>
                        <input
                            name="class"
                            type="text"
                            className="form-control"
                            id="editLocation"
                            value={user?.class}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="editLocation" className="form-label">Phone number</label>
                        <input
                            name="phoneNumber"
                            type="text"
                            className="form-control"
                            id="editLocation"
                            value={user?.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={() => {
                    setShow(false);
                }}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    disabled={loading}
                    onClick={handleSaveChange}
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
                        "Save"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default ModalEditUser;