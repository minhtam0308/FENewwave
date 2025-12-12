


import { useUserContext } from '../../context/UserContext';
import classView from '../css/ProfileUser.module.scss';
import { useEffect, useState } from 'react';
import ModalEditUser from './ModalUser/ModalEditUser';

const ProfileUser = () => {

    const { userContext, imageContext } = useUserContext();
    const user = userContext;
    const imageUser = imageContext;
    const [showEditModal, setShowEditModal] = useState(false);
    return (
        <div className="container my-5">
            <div className="header mb-5 text-center">
                <h1>Your Profile</h1>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className={`${classView.card} card`}>
                        <div className="card-body text-center">

                            <img src={imageUser} alt="User Image"
                                className={`rounded-circle mb-4 ${classView.userImage}`} style={{ "width": "150px", "height": "150px" }} />
                            <h5 className={`${classView.cardTitle} `} id="userName">{user?.name}</h5>

                            <div className={`${classView.infoItem}`}>
                                <i className="bi bi-envelope-fill"></i>
                                <p id={`${classView.userEmail}`}><strong>Email:</strong>{user?.email}</p>
                            </div>
                            <div className={`${classView.infoItem}`}>
                                <i className="bi bi-calendar-event-fill"></i>
                                <p id={`${classView.userAge}`}><strong>Age:</strong> {user?.age ? user.age : "???"}</p>
                            </div>
                            <div className={`${classView.infoItem}`}>
                                <i className="bi bi-geo-alt-fill"></i>
                                <p id="userLocation"><strong>Location:</strong> {user?.location ? user.location : "???"}</p>
                            </div>
                            <div className={`${classView.infoItem}`}>
                                <i className="bi bi-person-circle"></i>
                                <p id={`${classView.userBio}`}><strong>Department:</strong> {user?.department ? user.department : "???"}
                                </p>
                            </div>
                            <div className={`${classView.infoItem}`}>
                                <i className="bi bi-person-circle"></i>
                                <p id={`${classView.userBio}`}><strong>Class:</strong> {user?.class ? user.class : "???"}
                                </p>
                            </div>
                            <div className={`${classView.infoItem}`}>
                                <i className="bi bi-person-circle"></i>
                                <p id={`${classView.userBio}`}><strong>Phone number:</strong> {user?.phoneNumber ? user.phoneNumber : "???"}
                                </p>
                            </div>


                            <div className={`${classView.stats}`}>
                                <div className={`${classView.statItem}`}>
                                    <div className={`${classView.statNumber}`} id="followers">???</div>
                                    <small>Followers</small>
                                </div>
                                <div className={`${classView.statItem}`}>
                                    <div className={`${classView.statNumber}`} id="posts">???</div>
                                    <small>Posts</small>
                                </div>
                                <div className={`${classView.statItem}`}>
                                    <div className={`${classView.statNumber}`} id="likes">???</div>
                                    <small>Likes</small>
                                </div>
                            </div>

                            <button className={`btn btn-primary mt-4 ${classView.btnPrimary}`}
                                onClick={() => {
                                    setShowEditModal(true);
                                }}

                            >Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalEditUser
                show={showEditModal}
                setShow={setShowEditModal}
            />

        </div>
    )
}
export default ProfileUser;