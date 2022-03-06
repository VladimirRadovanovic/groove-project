from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Listing, Order, OrderItem
from app.forms import EditOrderForm


order_routes = Blueprint('orders', __name__)


@order_routes.route('/checkout', methods=['POST'])
@login_required
def make_order():
    req = request.json
    errors = []

    if len(req['items']) <= 0:
        errors.append('Your cart is empty.')
    if len(req['delivery_instructions']) > 100:
        errors.append('Delivery instructions must be less than 100 characters long.')
    for item in req['items']:
        available_copies = item['num_copies_available']
        album = item['album']
        artist = item['artist']
        if item['seller_id'] == req['user_id']:
            errors.append(f'"{album}" by "{artist}" is your listing. You may not purchase records you advertised.')
        if item['num_copies_available'] < item['cart_item_num']:

            errors.append(f'Only {available_copies} copies of the "{album}" by "{artist}" are available for sale.')

        if item['cart_item_num'] < 1:
            errors.append('You may not purchase less then 1 copy')
    if errors:
        return {'errors': errors}, 401

    if req['delivery_instructions']:
        order = Order(user_id=req['user_id'], total_cost=req['total_cost'], delivery_instructions=req['delivery_instructions'])
    else:
        order = Order(user_id=req['user_id'], total_cost=req['total_cost'])

    db.session.add(order)
    db.session.commit()

    for item in req['items']:
        ordered_item = OrderItem(listing_id=item['id'], order_id=order.id, num_items_ordered=item['cart_item_num'])
        db.session.add(ordered_item)
    db.session.commit()


    return {'order': order.to_dict()}


@order_routes.route('/all')
@login_required
def get_orders():
    orders = Order.query.all() #add .options(joinedload(Order.ordered_items)).all() maybe attach the listin as well
    return {'orders': {order.to_dict()['id']: order.to_dict() for order in orders}}


@order_routes.route('/<int:id>/remove', methods=['DELETE'])
@login_required
def cancel_order(id):
    order = Order.query.get(id)

    db.session.delete(order)
    db.session.commit()
    return {"message": "Deleted"}


@order_routes.route('/<int:id>/edit', methods=['PATCH'])
@login_required
def edit_order(id):

    form = EditOrderForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        order = Order.query.get(id)
        data = form.data

        if len(data['instructions']) > 0:
            order.delivery_instructions=data['instructions']
        else:
            order.delivery_instructions="Leave at the front door."


        db.session.commit()
        return {'order': order.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
