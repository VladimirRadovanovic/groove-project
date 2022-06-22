import requests
from flask import Blueprint

news_routes = Blueprint('news', __name__)

@news_routes.route('')
def get_news():
    url = "https://music-news-api.p.rapidapi.com/news"

    headers = {
        "X-RapidAPI-Key": "f0d3fc5a7dmshda164a3281ef468p1f59eajsn01b0f19daa3e",
        "X-RapidAPI-Host": "music-news-api.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)

    print(response.text, '\n news coming !!!!!#############################\n')
