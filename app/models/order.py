from .db import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    total_cost = db.Column(db.Float, nullable=False)
    delivery_instructions = db.Column(db.String(100), default='Leave at front door.')

    buyer = db.relationship('User', back_populates='orders')
    ordered_items = db.relationship('OrderItem', back_populates='order', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'user_id': self.user_id,
            # 'buyer': self.buyer.to_dict(),
            # 'ordered_items': {order_item.to_dict()['id']: order_item.to_dict() for order_item in self.ordered_items}
            'ordered_items': [order_item.to_dict() for order_item in self.ordered_items],
            'total_cost': self.total_cost,
            'delivery_instructions': self.delivery_instructions
        }


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    num_items_ordered = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    order = db.relationship('Order', back_populates='ordered_items')
    item = db.relationship('Listing', back_populates='ordered_by')


    def to_dict(self):
        return {
            'id': self.id,
            'listing_id': self.listing_id,
            'order_id': self.order_id,
            'item': self.item.to_dict(),
            'num_items_ordered': self.num_items_ordered,
            'created_at': self.created_at
        }
