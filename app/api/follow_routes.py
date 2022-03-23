from crypt import methods
from flask import request, Blueprint
from app.models import db, User
from flask_login import login_required, current_user


follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/follow', methods=['POST'])
@login_required
def follow_user():
    req = request.json
    print(req, '''dasdadashdkhasidhasiudhasdh
    dhashdashduasduashdhadash




    daklhjdkjashdahsdhasjdhiashd''', current_user.to_dict())

    followed_user = User.query.get(req['visitedProfileUserId'])
    user_following = User.query.get(req['sessionUserId'])

    followed_user.followers.append(user_following)
    db.session.commit()
    print(user_following.to_dict(), '''dsadasd



    dasdasd
    dasdasd


    ''')

    return {'user': user_following.to_dict()}
