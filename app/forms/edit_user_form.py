from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from flask_login import current_user

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != current_user.id:
        raise ValidationError('Username is already in use.')


class EditUserForm(FlaskForm):
    username = StringField(
        'Username', validators=[DataRequired(),
        Length(min=2, max=40, message="Username must be between 2 and 40 characters long"),
        username_exists])
    address = StringField(
        'Address', validators=[DataRequired(),
        Length(min=2, max=100, message="Address must be between 2 and 100 characters long")])
    city = StringField(
        'City', validators=[DataRequired(),
        Length(min=2, max=100, message="City must be between 2 and 100 characters long")])
    state = StringField(
        'State', validators=[Length(max=100, message="State must be less than 100 characters long")])
    zip_code = StringField(
        'Zip code', validators=[DataRequired(),
        Length(min=2, max=100, message="Zip code must be between 2 and 100 characters long")])
    country = StringField(
        'Country', validators=[DataRequired(),
        Length(min=2, max=100, message="Country must be between 2 and 100 characters long")])
