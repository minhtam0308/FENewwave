

import { useLocation } from 'react-router-dom';
import classView from '../css/ProfileUser.module.scss';

const ProfileUser = () => {
    const { user, imageUser } = useLocation().state;
    return (
        <div class="container my-5">
            <div class="header mb-5 text-center">
                <h1>Your Profile</h1>
                <p>View your information clearly and easily</p>
            </div>

            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class={`${classView.card} card`}>
                        <div class="card-body text-center">

                            <img src={imageUser} alt="User Image"
                                class={`rounded-circle mb-4 ${classView.userImage}`} style={{ "width": "150px", "height": "150px" }} />


                            <h5 class={`${classView.cardTitle} `} id="userName">{user?.name}</h5>

                            <div class={`${classView.infoItem}`}>
                                <i class="bi bi-envelope-fill"></i>
                                <p id={`${classView.userEmail}`}><strong>Email:</strong>{user?.email}</p>
                            </div>
                            <div class={`${classView.infoItem}`}>
                                <i class="bi bi-calendar-event-fill"></i>
                                <p id={`${classView.userAge}`}><strong>Age:</strong> {user?.age ? user.age : "???"}</p>
                            </div>
                            <div class={`${classView.infoItem}`}>
                                <i class="bi bi-geo-alt-fill"></i>
                                <p id="userLocation"><strong>Location:</strong> {user?.location ? user.location : "???"}</p>
                            </div>
                            <div class={`${classView.infoItem}`}>
                                <i class="bi bi-person-circle"></i>
                                <p id={`${classView.userBio}`}><strong>Bio:</strong> A passionate developer who loves coding and coffee.
                                </p>
                            </div>


                            <div class={`${classView.stats}`}>
                                <div class={`${classView.statItem}`}>
                                    <div class={`${classView.statNumber}`} id="followers">???</div>
                                    <small>Followers</small>
                                </div>
                                <div class={`${classView.statItem}`}>
                                    <div class={`${classView.statNumber}`} id="posts">???</div>
                                    <small>Posts</small>
                                </div>
                                <div class={`${classView.statItem}`}>
                                    <div class={`${classView.statNumber}`} id="likes">???</div>
                                    <small>Likes</small>
                                </div>
                            </div>

                            <button class={`btn btn-primary mt-4 ${classView.btnPrimary}`}>Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ProfileUser;