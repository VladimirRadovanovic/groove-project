

import { ShowFollowsModal } from "../../context/Modal";
import Follow from "./Follow";


function FollowersModal({ user, onClose, onOpen }) {

    const usersFollowers = Object.values(user?.followers)
    return (
      <ShowFollowsModal onClose={onClose}>
          {usersFollowers.map(user => (
              <div key={user?.id}>{user?.username}</div>
          ))}

      </ShowFollowsModal>
    )
}

export default FollowersModal;
