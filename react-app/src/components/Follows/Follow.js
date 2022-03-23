import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFollow, stopFollowing } from "../../store/follows";


function Follow({ user }) {

    const dispatch = useDispatch()

    const { userId } = useParams()
    // const id = Number(userId)
    const sessionUserId = useSelector(state => state.session.user.id)
    const alreadyFollowing = useSelector(state => state.session.user.following[userId])

    console.log(alreadyFollowing, ' already following!!!!!!!!!')


    const handleFollow = async() => {

        if(alreadyFollowing) {
            await dispatch(stopFollowing(Number(userId), sessionUserId))
        } else {

            await dispatch(setFollow(Number(userId), sessionUserId))
        }
    }

    const handleFollowsModal = async(e) => {
        const id = e.target.id.split('-')[1]
        if(alreadyFollowing) {
            await dispatch(stopFollowing(Number(id), sessionUserId))
        } else {

            await dispatch(setFollow(Number(id), sessionUserId))
        }
    }

    console.log(user, 'user modal follow')

    return (
        <>
        <button id={`follow-${user?.id}`} onClick={user ? handleFollowsModal : handleFollow}>{alreadyFollowing ? 'Unfollow' : 'Follow'}</button>
        </>
    )
}

export default Follow;
