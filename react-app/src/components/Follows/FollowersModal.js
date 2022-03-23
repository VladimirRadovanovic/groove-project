

import { ShowFollowsModal } from "../../context/Modal";
import Follow from "./Follow";


function FollowersModal({ user, onClose }) {

    const usersFollowers = Object.values(user?.followers)
    return (
      <ShowFollowsModal onClose={onClose}>
          {usersFollowers.map(user => (
              <div key={user?.id}>
              <div >{user?.username}</div>
               <Follow user={user} />
              </div>
          ))}

      </ShowFollowsModal>
    )
}

export default FollowersModal;
