const GET_NEWS = 'news/get_news'

const setNews = (news) => {
    return {
        type: GET_NEWS,
        news
    }
}

export const getNews = () => async(dispatch) => {
    const response = await fetch('/api/news')
    if (response.ok) {
        const news = await response.json()
        dispatch(setNews(news.news))
        console.log(news)
    }
}


const newsReducer = (state = [], action) => {
    switch(action.type){
        case GET_NEWS:
            const newState = [...action.news]
            return newState
        default:
            return state
    }
}

export default newsReducer;
