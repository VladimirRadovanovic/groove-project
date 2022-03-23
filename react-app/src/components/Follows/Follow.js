import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFollow } from "../../store/follows";

function Follow() {

    const dispatch = useDispatch()

    const { userId } = useParams()
    const sessionUserId = useSelector(state => state.session.user.id)


    const handleFollow = async() => {
        await dispatch(setFollow(Number(userId), sessionUserId))
    }

    return (
        <>
        <button onClick={handleFollow}>Follow</button>
        </>
    )
}

export default Follow;
