from app import db_wrapper
from app.models import User
from peewee import *
import secrets

def generate_token():
    return secrets.token_urlsafe(12).lower()

class Post(db_wrapper.Model):
    transloadit_id = CharField(null=False)
    uid = CharField(null=False, default=generate_token)
    name = CharField(null=False)
    text = TextField(null=False)
    user = ForeignKeyField(User, backref="posts", field="email")
    animal_type = CharField(null=True)
    # timestamp = DateField(null=False)

    @property
    def to_dict(self):
        res = {}
        for field_name in self._meta.sorted_field_names:
            try:
                value = getattr(self, field_name, None)
                if value is not None:
                    if field_name == "user":
                        res[field_name] = self.user.to_dict
                    else:
                        res[field_name] = value
            except:
                continue
        res['balance'] = 0
        for trans in self.related_transactions:
            res['balance'] += trans.amount
        return res

Post.create_table()