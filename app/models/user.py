from app import db_wrapper
from peewee import *
from datetime import datetime
import secrets, hashlib

def generate_token():
    return secrets.token_urlsafe(12).lower()

class User(db_wrapper.Model):
    created_at = DateTimeField(default=datetime.now, null=False)
    uid = CharField(default=generate_token, null=False)
    email = CharField(null=False, unique=True)
    
    first_name = CharField(null=False)
    last_name = CharField(null=False)

    dob = DateField(null=True)
    gender = CharField(null=True)
    nationality = CharField(null=False)
    mobile_phone_number = CharField(null=False)

    
    
    description = TextField(null=False)
    location = CharField(null=True)
    is_organisation = BooleanField(null=False, default=False)
    
    password = CharField(null=True)

    vault_account_id = CharField(null=False)
    vault_customer_id = CharField(null=False)

    # Will need to enter bank account information later

    def set_password(self, password):
        self.password = str(hashlib.sha256(password.encode('utf-8')).hexdigest())
        self.save()

    def check_password(self, password):
        return self.password == str(hashlib.sha256(password.encode('utf-8')).hexdigest())

    @property
    def to_dict(self):
        res = {}
        for field_name in self._meta.sorted_field_names:
            try:
                value = getattr(self, field_name, None)
                if value is not None:
                    res[field_name] = value
            except:
                continue
        del res['password']
        return res

User.create_table()