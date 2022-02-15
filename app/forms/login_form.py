from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(),\
        Email(message="Please enter a valid email address"),\
        Length(min=6, max=255, message="Email address must be between 6 and 255 characters long"),\
        user_exists])
    password = StringField('Password', validators=[
        DataRequired(),\
        Length(min=6, max=50, message="Password must be between 6 and 50 characters long"),\
        password_matches])
