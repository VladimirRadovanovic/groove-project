from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def match_passswords(form, field):
    password = form.data['password']

    repeat_password = form.data['repeat_password']

    if password != repeat_password:
        raise ValidationError('Password and repeat password input values must match.')


class SignUpForm(FlaskForm):
    username = StringField(
        'Username', validators=[DataRequired(),
        Length(min=2, max=40, message="Username must be between 2 and 40 characters long"),
        username_exists])
    email = StringField('Email', validators=[DataRequired(),
        Email(message="Please enter a valid email address"),
        Length(min=6, max=255, message="Email address must be between 6 and 255 characters long"),
        user_exists])
    password = StringField('Password', validators=[DataRequired(), match_passswords,
        Length(min=6, max=50, message="Password must be between 6 and 50 characters long")])
    repeat_password = StringField('Repeat Password', validators=[DataRequired()])
    address = StringField(
        'Address', validators=[DataRequired(),
        Length(min=2, max=100, message="Address must be between 2 and 100 characters long")])
    city = StringField(
        'City', validators=[DataRequired(),
        Length(min=2, max=100, message="City must be between 2 and 100 characters long")])
    state = StringField(
        'State', validators=[Length(max=2, message="If entered, state input should be 2 characters long")])
    zip_code = StringField(
        'Zip code', validators=[DataRequired(),
        Length(min=2, max=100, message="Zip code must be between 2 and 100 characters long")])
    country = StringField(
        'Country', validators=[DataRequired(),
        Length(min=2, max=100, message="Country must be between 2 and 100 characters long")])
