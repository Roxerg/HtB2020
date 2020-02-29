from app import db_wrapper
from app.models import User
from peewee import *
import secrets

def generate_token():
    return secrets.token_urlsafe(12).lower()

class Post(db_wrapper.Model):
    transloadit_id = Charfield(null=False)
    uid = CharField(null=False, default=generate_token)
    text = TextField(null=False)
    user = ForeignKeyField(User, backref="posts")
    animal_type = CharField(null=True)
    # timestamp = DateField(null=False)

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
        return res

Post.create_table()