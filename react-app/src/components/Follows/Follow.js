import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFollow, stopFollowing } from "../../store/follows";
import './Follow.css'


function Follow({ user }) {

    const dispatch = useDispatch()

    const { userId } = useParams()
    let followsButtonClass = userId ? 'follow-button-large' : 'follow-button-modal'
    // const id = Number(userId)
    const sessionUserId = useSelector(state => state.session.user.id)
    const alreadyFollowing = useSelector(state => state.session.user.following[user ? user.id : userId])




    const handleFollow = async() => {

        if(alreadyFollowing) {
            await dispatch(stopFollowing(Number(userId), sessionUserId))
        } else {

            await dispatch(setFollow(Number(userId), sessionUserId))
        }
    }

    const handleFollowsModal = async(e) => {
        const id = Number(e.target.id.split('-')[1])

        if(alreadyFollowing) {

            await dispatch(stopFollowing(id, sessionUserId))
        } else {
            await dispatch(setFollow(id, sessionUserId))
        }
    }



    return (
        <>
        <button className={followsButtonClass} id={`follow-${user?.id}`} onClick={user ? handleFollowsModal : handleFollow}>{alreadyFollowing ? 'Unfollow' : 'Follow'}</button>
        </>
    )
}

export default Follow;
