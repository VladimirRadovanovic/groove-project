from crypt import methods
from flask import request, Blueprint
from app.models import db, User
from flask_login import login_required, current_user


follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/follow', methods=['POST'])
@login_required
def follow_user():
    req = request.json

    followed_user = User.query.get(req['visitedProfileUserId'])
    user_following = User.query.get(req['sessionUserId'])

    followed_user.followers.append(user_following)
    db.session.commit()

    return {'user': user_following.to_dict()}


@follow_routes.route('/unfollow', methods=['DELETE'])
@login_required
def unfollow_user():
    req = request.json

    user = User.query.get(req['sessionUserId'])
    user.following = [still_following for still_following in user.following if still_following.to_dict()['id'] != req['visitedProfileUserId']]
    db.session.commit()

    return {'user': user.to_dict()}
