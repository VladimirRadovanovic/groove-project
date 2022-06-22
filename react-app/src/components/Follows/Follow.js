import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFollow, stopFollowing } from "../../store/follows";


function Follow({ user }) {
    console.log(user, '!!!!!!!USSER(((((((((((((((((')
    const dispatch = useDispatch()

    const { userId } = useParams()
    // const id = Number(userId)
    const sessionUserId = useSelector(state => state.session.user.id)
    const alreadyFollowing = useSelector(state => state.session.user.following[user ? user.id : userId])
    console.log(alreadyFollowing, 'lready following@@@@@@@@@@@@@@')



    const handleFollow = async() => {

        if(alreadyFollowing) {
            await dispatch(stopFollowing(Number(userId), sessionUserId))
        } else {

            await dispatch(setFollow(Number(userId), sessionUserId))
        }
    }

    const handleFollowsModal = async(e) => {
        const id = Number(e.target.id.split('-')[1])
        console.log('following test_____________++++++++++++++++', user.id, user.username)
        if(alreadyFollowing) {
        console.log('following test_____________++++++++++++++++ in the if', user.id, id,  user.username)

            await dispatch(stopFollowing(id, sessionUserId))
        } else {
            await dispatch(setFollow(id, sessionUserId))
        }
    }



    return (
        <>
        <button id={`follow-${user?.id}`} onClick={user ? handleFollowsModal : handleFollow}>{alreadyFollowing ? 'Unfollow' : 'Follow'}</button>
        </>
    )
}

export default Follow;
