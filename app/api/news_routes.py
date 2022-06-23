from distutils.log import error
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
    if response.headers['Content-Type'] == 'text/html; charset=utf-8':
        return {'errors': ['There was a problem with the API. More news soon...']}, 401

    # print(response.headers['Content-Type'] == 'text/html; charset=utf-8', "$$$$$$$$$$$$$$$$$$$$$$$", response.text)

    return {'news': response.json()}
