from turtle import heading
from .db import db
from datetime import datetime

class Review(db.Model):
    __tablename__= 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)
    headline = db.Column(db.String(50), nullable=False)
    review = db.Column(db.String(500), nullable=False)
    # star_rating = db.Column(db.Float, nullable=False)

    # user = db.relationship('User', back_populates='reviews')
    # listing = db.relationship('Listing', back_populates='reviews')


    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'listing_id': self.listing_id,
            'headline': self.headline,
            'review': self.review,
            # 'star_rating': self.star_rating
        }
