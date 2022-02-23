from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import EditUserForm
from app.models import User, db
from app.api.auth_routes import validation_errors_to_error_messages
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
    if user is not None:
        return user.to_dict()
    else:
        return {'errors': ['User not found.']}


@user_routes.route("/upload-profile-photo", methods=["PUT"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": ["image required"]}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": ["file type not permitted"]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a filename key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    print(url, 'url not saving&&&&&&&&&&&&*********************')
    # we can use the
    # new_image = Photo(post_id=current_user, photo=url)#post id instead of user
    user = User.query.get(current_user.id)
    user.profile_img_url = url
    # db.session.add(user)
    db.session.commit()
    return {'user': user.to_dict()}


@user_routes.route('/<int:id>/edit', methods=['PATCH'])
@login_required
def edit_user(id):
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        user = User.query.get(id)
        user.username=data['username']
        user.address=data['address']
        user.city=data['city']
        user.state=data['state']
        user.zip_code=data['zip_code']
        user.country=data['country']

        db.session.commit()

        return {'user': user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
