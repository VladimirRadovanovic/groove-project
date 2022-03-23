import { setUser } from "./session"

const SET_FOLLOW = 'follows/set_follow'

export const setFollow = (visitedProfileUserId, sessionUserId) => async(dispatch) => {
    console.log(visitedProfileUserId, sessionUserId, 'in the thunk session id')
    const response = await fetch('/api/follows/follow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({visitedProfileUserId, sessionUserId})
    })

    if (response.ok) {
        const data = await response.json()
        console.log(data, 'in the thunk setting the user')
        dispatch(setUser(data.user))
    }
}
