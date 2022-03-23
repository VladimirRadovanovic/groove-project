import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFollow, stopFollowing } from "../../store/follows";


function Follow() {

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

    return (
        <>
        <button onClick={handleFollow}>{alreadyFollowing ? 'Unfollow' : 'Follow'}</button>
        </>
    )
}

export default Follow;
