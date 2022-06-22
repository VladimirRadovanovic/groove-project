import { NavLink } from "react-router-dom";

import { ShowFollowsModal } from "../../context/Modal";
import Follow from "./Follow";
import avatar from '../../images/avatar.svg'



function FollowersModal({ user, onClose }) {

    const usersFollowers = Object.values(user?.followers)
    return (
        <ShowFollowsModal onClose={onClose}>
            <h3 className="follow-modal-heading">
                Followers
            </h3>
            <i onClick={onClose} className="fa-solid fa-x close-follow-button"></i>
            <div className="follow-modal-all-users-container">
                {usersFollowers.map(user => (
                    <div className="follow-modal-user-info-container" key={user.id}>
                        <NavLink to={`/users/${user.id}/profile`} >
                            <img className="follow-modal-profile-img" src={user.profile_img_url ? user.profile_img_url : avatar} alt='profile' />
                        </NavLink>
                        <NavLink className='follow-modal-user-link' to={`/users/${user.id}/profile`} >{user.username}</NavLink>
                        <Follow user={user} />
                    </div>
                ))}
            </div>
        </ShowFollowsModal>
    )
}

export default FollowersModal;
