from app import db_wrapper
from peewee import *
from app.models import Post, User

class Like(db_wrapper.Model):
    post = ForeignKeyField(Post, backref="likes")
    user = ForeignKeyField(User, backref="liked_posts")

Like.create_table()