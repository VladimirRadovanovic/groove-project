from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_img_url = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    listings = db.relationship('Listing', back_populates='seller')
    orders = db.relationship('Order', back_populates='buyer')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_img_url': self.profile_img_url,
            'created_at': self.created_at,
            'listings': {listing.to_dict()['id']: listing.to_dict() for listing in self.listings},
            'orders': {order.to_dict()['id']: order.to_dict() for order in self.orders}
        }

    def to_dict_first(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_img_url': self.profile_img_url,
            'created_at': self.created_at,
            'orders': {order.to_dict()['id']: order.to_dict() for order in self.orders}
        }
