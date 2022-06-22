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
    print('in the route@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', req)

    user = User.query.get(req['sessionUserId'])
    print(user.to_dict(), user.following, 'in the route@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    user.following = [still_following for still_following in user.following if still_following.to_dict()['id'] != req['visitedProfileUserId']]
    print([still_following for still_following in user.following if still_following.to_dict()['id'] != req['visitedProfileUserId']], 'test comprehansion!!!!!!!!!!!!!!!!!!!')

    db.session.commit()

    return {'user': user.to_dict()}
