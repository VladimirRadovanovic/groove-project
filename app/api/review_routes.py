from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Listing, Order, OrderItem, Review, review
from app.forms.crate_review_form import CreateReviewForm



review_routes = Blueprint('reviews', __name__)


@review_routes.route('/create', methods=['POST'])
@login_required
def make_review():
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        req = request.json

        review = Review(
            user_id=current_user.id,
            listing_id=req['listing_id'],
            headline=data['headline'],
            review=data['review'],
            rating=data['rating']
            )

        db.session.add(review)
        db.session.commit()
        return {'review': review.to_dict()}
        # return {'review': 'passed'}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/listings/<int:id>')
def load_reviews(id):
    print(id, '''



    in the route


    ''')
    reviews = Review.query.filter(Review.listing_id == int(id)).all()
    print(reviews, '******************************rev(((((((((()))))))))))))))))))))))))))))))')
    return {'reviews': {str(rev.id): rev.to_dict() for rev in reviews}}
