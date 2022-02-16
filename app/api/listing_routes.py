from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Listing
from app.forms import CreateListingForm

listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/all')
def get_all_listings():
    listings = Listing.query.all()

    return {'listings': {listing.to_dict()['id']: listing.to_dict() for listing in listings}}


@listing_routes.route('/create', methods=['POST'])
@login_required
def create_listing():
    form = CreateListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_listing = Listing(
            seller_id=current_user.id,
            artist=data['artist'],
            album=data['album'],
            genre=data['genre'],
            description=data['description'],
            condition=data['condition'],
            price=data['price'],
            num_copies_available=data['num_copies_available']
        )

        db.session.add(new_listing)
        db.session.commit()
        return {'listing': new_listing.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
