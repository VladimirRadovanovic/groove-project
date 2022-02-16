from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Listing

def check_price(form, field):
    price = field.data
    if price <= 0 or price > 1000:
        raise ValidationError('Price must be more than $0.00 and less than $1,000.00.')

def check_num_copies(form, field):
    num_copies_available = field.data
    if num_copies_available <= 0:
        raise ValidationError('Number of available copies must be more than 0.')


class CreateListingForm(FlaskForm):
    artist = StringField(
        'Artist', validators=[DataRequired(),
        Length(max=100, message='Artist must be less than 100 characters long.')
        ]
    )
    album = StringField(
        'Album', validators=[DataRequired(),
        Length(max=100, message='Album must be less than 100 characters long.')
        ]
    )
    genre = StringField(
        'Genre', validators=[DataRequired(),
        Length(max=50, message='Genre must be less than 50 characters long.')
        ]
    )
    description = StringField(
        'Description', validators=[DataRequired(),
        Length(min=6, max=255, message='Description must be between 6 and 255 characters long.')
        ]
    )
    condition = StringField(
        'Condition', validators=[DataRequired(),
        Length(max=50, message='Condition must be less than 50 characters long.')
        ]
    )
    price = FloatField('Price', validators=[DataRequired(), check_price])
    num_copies_available = IntegerField('Num_copies_available', validators=[DataRequired(), check_num_copies])
