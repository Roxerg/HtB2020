from app import db_wrapper
from peewee import *
from datetime import datetime
import secrets, hashlib

from app.models import Post, User


def generate_token():
    return secrets.token_urlsafe(12).lower()


class BankAccount(db_wrapper.Model):

    uid = CharField(null=False, default=generate_token)
    user = ForeignKeyField(User, backref="bank_accounts")
    balance = FloatField(default=0, null=False)

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

BankAccount.create_table()