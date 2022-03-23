import { setUser } from "./session"

const SET_FOLLOW = 'follows/set_follow'

export const setFollow = (visitedProfileUserId, sessionUserId) => async(dispatch) => {
    const response = await fetch('/api/follows/follow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({visitedProfileUserId, sessionUserId})
    })

    if (response.ok) {
        const data = response.json()
        setUser(data.user)
    }
}
