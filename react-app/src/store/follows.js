import { setUser } from "./session"

const SET_FOLLOW = 'follows/set_follow'
const STOP_FOLLOWING = 'follows/stop_following'



export const stopFollowing = (visitedProfileUserId, sessionUserId) => async(dispatch) => {

    const response = await fetch('/api/follows/unfollow', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({visitedProfileUserId, sessionUserId})
    })


    if (response.ok) {
        const data = await response.json()

        dispatch(setUser(data.user))
    }
}



export const setFollow = (visitedProfileUserId, sessionUserId) => async(dispatch) => {

    const response = await fetch('/api/follows/follow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({visitedProfileUserId, sessionUserId})
    })
    if (response.ok) {
        const data = await response.json()

        dispatch(setUser(data.user))
    }
}
