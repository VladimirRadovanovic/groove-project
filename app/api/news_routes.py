import requests
from flask import Blueprint
import os


news_routes = Blueprint('news', __name__)

@news_routes.route('')
def get_news():
    url = "https://music-news-api.p.rapidapi.com/news/kerrang"

    headers = {
        "X-RapidAPI-Key": os.environ.get('X_RapidAPI_Key'),
        "X-RapidAPI-Host": os.environ.get('X_RapidAPI_Host')
    }

    response = requests.request("GET", url, headers=headers)

    return {'news': response.json()}
