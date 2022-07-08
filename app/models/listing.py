from .db import db
from datetime import datetime


class Listing(db.Model):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    seller_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    album = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    condition = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    num_copies_available = db.Column(db.Integer, nullable=False)
    img_url = db.Column(db.String(255))
    aws_img_key = db.Column(db.String())

    #one seller has many listings
    seller = db.relationship('User', back_populates='listings')
    ordered_by = db.relationship('OrderItem', back_populates='item', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='listing', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'seller_id': self.seller_id,
            'artist': self.artist,
            'album': self.album,
            "genre": self.genre,
            'description': self.description,
            'condition': self.condition,
            'price': self.price,
            'created_at': self.created_at,
            'seller': self.seller.to_dict_first(),
            'num_copies_available': self.num_copies_available,
            'img_url': self.img_url,
        }
