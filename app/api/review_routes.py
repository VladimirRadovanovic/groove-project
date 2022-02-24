from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Listing, Order, OrderItem, Review
from app.forms.crate_review_form import CreateReviewForm



review_routes = Blueprint('reviews', __name__)


@review_routes.route('/create', methods=['POST'])
@login_required
def make_review():
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print(data, '*************************data*************************')
        # review = Review(
        #     user_id=current_user.id,
        #     listing_id=data['listing_id'],
        #     headline=data['headline'],
        #     review=data['review'],
        #     star_rating=data['star_rating]
        #     )

        # db.session.add(review)
        # db.session.commit()
        # return {'review': review.to_dict()}
        return {'review': 'passed'}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
