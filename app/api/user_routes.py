from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/upload-profile-photo", methods=["PUT"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a filename key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # we can use the
    # new_image = Photo(post_id=current_user, photo=url)#post id instead of user
    user = User.query.get(current_user.id)
    user.profile_image_url = url
    db.session.add(user)
    db.session.commit()
    return {"url": url}
