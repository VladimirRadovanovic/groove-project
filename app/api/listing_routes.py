from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Listing
from app.forms import CreateListingForm
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/all')
def get_all_listings():
    listings = Listing.query.all()
    return {'listings': {listing.to_dict()['id']: listing.to_dict() for listing in listings}}


@listing_routes.route('/<int:id>/edit', methods=['PATCH'])
@login_required
def edit_listing(id):
    form = CreateListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": ["File type not permitted"]}, 400

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a filename key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400


        url = upload["url"]



        if form.validate_on_submit():
            # id = request.id
            listing = Listing.query.get(id)
            data = form.data
            listing.artist=data['artist']
            listing.album=data['album']
            listing.genre=data['genre']
            listing.description=data['description']
            listing.condition=data['condition']
            listing.price=data['price']
            listing.num_copies_available=data['num_copies_available']
            listing.img_url = url

            # db.session.add(listing)
            db.session.commit()

            return {'listing': listing.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


    else:
        if form.validate_on_submit():
            # id = request.id
            listing = Listing.query.get(id)
            data = form.data
            listing.artist=data['artist']
            listing.album=data['album']
            listing.genre=data['genre']
            listing.description=data['description']
            listing.condition=data['condition']
            listing.price=data['price']
            listing.num_copies_available=data['num_copies_available']

            # db.session.add(listing)
            db.session.commit()

            return {'listing': listing.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@listing_routes.route('/create', methods=['POST'])
@login_required
def create_listing():
    form = CreateListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": ["File type not permitted"]}, 400

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a filename key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400


        url = upload["url"]


        if form.validate_on_submit():
            data = form.data
            # print(dir(current_user), '\\\ndakdopasdkapodsadpkasdpaksdpokasdpokpsdk\\\\\\\
            #     \n/!!!!!!!!!!!!!!!!!!!!!!!!rwerreerewrwerwerwerwerwerwerwerwerwerwer//////')

            new_listing = Listing(
                seller_id=current_user.id,
                artist=data['artist'],
                album=data['album'],
                genre=data['genre'],
                description=data['description'],
                condition=data['condition'],
                price=data['price'],
                num_copies_available=data['num_copies_available'],
                img_url = url
            )

            db.session.add(new_listing)
            db.session.commit()
            return {'listing': new_listing.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    else:
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
                num_copies_available=data['num_copies_available'],
            )

            db.session.add(new_listing)
            db.session.commit()
            return {'listing': new_listing.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401




@listing_routes.route('/<int:id>/remove', methods=['DELETE'])
@login_required
def remove_listing(id):
    listing = Listing.query.get(id)
    db.session.delete(listing)
    db.session.commit()
    return {"message": "Deleted"}
