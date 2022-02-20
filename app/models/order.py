from .db import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    buyer = db.relationship('User', back_populates='orders')
    ordered_items = db.relationship('OrderItem', back_populates='order', cascade="all, delete-orphan")


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    num_items_ordered = db.Column(db.Integer, nullable=False)

    order = db.relationship('Order', back_populates='ordered_items')
    item = db.relationship('Listing', back_populates='ordered_by')
