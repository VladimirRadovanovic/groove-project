from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Listing


search_routes = Blueprint('search', __name__)


@search_routes.route('/', methods=['POST'])
def search_listings():
    req = request.json
    print('''dassdasdasddasd
    asdasdasddsaa
    sdsadas
    ''', req, '''dasdasd
    asdasdasdasdasdasda
    sdasddsadasd''')
    searched_listings = Listing.query.filter((Listing.album.ilike(f'%{req}%')) | (Listing.artist.ilike(f'%{req}%'))).all()
    print([listing.to_dict() for listing in searched_listings])
    return {'searched': [listing.to_dict() for listing in searched_listings]}
