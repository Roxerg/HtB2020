from app import db_wrapper
from peewee import *
from datetime import datetime
from .user import User
import secrets

def generate_token():
    return secrets.token_urlsafe(12).lower()

class Session(db_wrapper.Model):
    created_at = DateTimeField(default=datetime.now)
    token = CharField(default=generate_token)
    user = ForeignKeyField(User,on_delete='cascade', null=False)

Session.create_table()