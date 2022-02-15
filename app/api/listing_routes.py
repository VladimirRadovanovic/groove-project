from flask import Blueprint, jsonify
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Listing

listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/all')
def get_all_listings():
    listings = Listing.query.all()
    print({'listings': {listing.to_dict()['id']: listing.to_dict() for listing in listings}})
    return {'listings': {listing.to_dict()['id']: listing.to_dict() for listing in listings}}
