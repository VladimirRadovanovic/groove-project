from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_img_url = db.Column(db.String(255))
    aws_profile_img_key = db.Column(db.String())
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100))
    zip_code= db.Column(db.String(100), nullable=False)
    country= db.Column(db.String(100), nullable=False)

    # set the cascade delete on the user if you would like the ability to delete a profile
    listings = db.relationship('Listing', back_populates='seller')
    orders = db.relationship('Order', back_populates='buyer')
    reviews = db.relationship('Review', back_populates='user')
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

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
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'country': self.country,
            'created_at': self.created_at,
            'listings': {listing.to_dict()['id']: listing.to_dict() for listing in self.listings},
            'following': {user.to_dict_first()['id']: user.to_dict_first() for user in self.following},
            'followers': {user.to_dict_first()['id']: user.to_dict_first() for user in self.followers}
            # 'orders': {order.to_dict()['id']: order.to_dict() for order in self.orders}
        }

    def to_dict_first(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_img_url': self.profile_img_url,
            'created_at': self.created_at,
            # 'orders': {order.to_dict()['id']: order.to_dict() for order in self.orders}
        }
