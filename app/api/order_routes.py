from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Listing, Order, OrderItem


order_routes = Blueprint('orders', __name__)


@order_routes.route('/checkout', methods=['POST'])
@login_required
def make_order():
    req = request.json
    errors = []
    # print('********************',req, 'request pre if&&&&&&&&&*********((((((((((((')
    for item in req['items']:
        available_copies = item['num_copies_available']
        album = item['album']
        artist = item['artist']
        if item['seller_id'] == req['user_id']:
            errors.append(f'"{album}" by "{artist}" is your listing. You may not purchase records you advertised.')
        if item['num_copies_available'] < item['cart_item_num']:
            # print(item, 'item *****************')
            errors.append(f'Only {available_copies} copies of the "{album}" by "{artist}" are available for sale.')
            # return {'errors' :[f'Only {available_copies} copies of the "{album}" by "{artist}" are available for sale.']}
        if item['cart_item_num'] < 1:
            errors.append('You may not purchase less then 1 copy')
    if errors:
        return {'errors': errors}, 401

    order = Order(user_id=req['user_id'])
    db.session.add(order)
    db.session.commit()

    for item in req['items']:
        ordered_item = OrderItem(listing_id=item['id'], order_id=order.id, num_items_ordered=item['cart_item_num'])
        db.session.add(ordered_item)
    db.session.commit()


    # print('**************in the routein the routein the routein the routein the routein the routein the route***************')
    # print(req['items'][0],'request data ***********************************************************')
    return {'order': order.to_dict()}


@order_routes.route('/all')
@login_required
def get_orders():
    orders = Order.query.all() #add .options(joinedload(Order.ordered_items)).all() maybe attach the listin as well
    return {'orders': {order.to_dict()['id']: order.to_dict() for order in orders}}
