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
        Length(max=100, message='Description must be less than 255 characters long.')
        ]
    )
    condition = StringField(
        'Condition', validators=[DataRequired(),
        Length(max=50, message='Condition must be less than 50 characters long.')
        ]
    )
    price = FloatField('Price', validators=[DataRequired(), check_price])
    num_copies_available = IntegerField('Num_copies_available', validators=[DataRequired(), check_num_copies])



    # username = StringField(
    #     'Username', validators=[DataRequired(),
    #     Length(min=1, max=50, message="Username address must be between 1 and 50 characters long"),
    #     username_exists])
    # email = StringField('Email', validators=[DataRequired(),
    #     Email(message="Please enter a valid email address"),
    #     Length(min=6, max=255, message="Email address must be between 6 and 255 characters long"),
    #     user_exists])
    # password = StringField('Password', validators=[DataRequired(), match_passswords,
    #     Length(min=6, max=50, message="Password must be between 6 and 50 characters long")])
    # repeat_password = StringField('Repeat Password', validators=[DataRequired()])
