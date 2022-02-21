from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length
from app.models import Order


class EditOrderForm(FlaskForm):
    instructions = StringField('Instructions', validators=[Length(max=100, message='Delivery instructions must be less than 100 characters long.')])
