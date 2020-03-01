from app import db_wrapper
from peewee import *
from app.models import Post, User, BankAccount

class Transaction(db_wrapper.Model):

    payer_bank = ForeignKeyField(BankAccount, backref="payer_transactions")
    receiver_bank = ForeignKeyField(BankAccount, backref="receiver_transactions")
    amount = FloatField(default=0, null=False) 
    post_ident = ForeignKeyField(Post, backref="related_transactions")


    @property
    def to_dict(self):
        res = {}
        for field_name in self._meta.sorted_field_names:
            try:
                value = getattr(self, field_name, None)
                if field_name in ['payer_bank', 'post_ident', 'receiver_bank'] and value is not None:
                    res[field_name] = value.uid
                elif value is not None:
                    res[field_name] = value
            except:
                continue
        return res

Transaction.create_table()