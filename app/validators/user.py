from app.models import User
from peewee_validates import validate_email, validate_not_empty, BooleanField, StringField, DateTimeField, Validator, ValidationError

def validate_email_unique(field, data):
    if field and field.value:
        try:
            user = User.get(email=field.value)
        except:
            return
        raise ValidationError("email_unique")

class UserValidator(Validator):

    email = StringField(required=True, validators=[validate_email()])
    name = StringField(required=True, validators=[validate_not_empty()])
    description = StringField(required=True, validators=[validate_not_empty()])
    location = StringField(required=False)

    class Meta:
        messages = {
            'email_unique': 'This email has already been used, please use another or log in.'
        }