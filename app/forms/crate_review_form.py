from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange


class CreateReviewForm(FlaskForm):
    headline = StringField('Headline', validators=[DataRequired(),
    Length(min=3, max=50, message='Headline must be between 3 and 50 characters long.')
    ])
    review = StringField('Review', validators=[DataRequired(),
    Length(min=4, max=500, message='Review must be between 4 and 500 characters long.')
    ])
    rating= IntegerField('Rating', validators=[DataRequired()])
