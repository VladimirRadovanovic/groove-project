import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Follow() {

    const dispatch = useDispatch()

    const { userId } = useParams()
    const sessionUserId = useSelector(state => state.session.user.id)


    const handleFollow = async() => {
        await dispatch(setFollow(Number(userId), sessionUserId))
    }

    return (
        <>
        <button onClick={handelFollow}>Follow</button>
        </>
    )
}

export default Follow;
