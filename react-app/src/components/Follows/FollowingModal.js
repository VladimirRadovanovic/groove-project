import { ShowFollowsModal } from "../../context/Modal";
import Follow from "./Follow";


function FollowingModal({user, onClose}) {
    const usersFollowing = Object.values(user?.following)
    return (
      <ShowFollowsModal onClose={onClose}>
          {usersFollowing.map(user => (
              <div key={user?.id}>
              <div >{user?.username}</div>
               <Follow user={user} />
              </div>
          ))}

      </ShowFollowsModal>
    )
}

export default FollowingModal;
