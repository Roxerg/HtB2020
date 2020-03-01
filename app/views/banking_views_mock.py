from flask import Blueprint, session, jsonify, request
from app.models import Session, User, BankAccount, Transaction, Post
from app.validators import UserValidator
from datetime import datetime, timedelta
import functools

from datetime import date


from .auth_views import login_required
from .post_views import get_user

banking_mock_bp = Blueprint('banking_mock', __name__)

@banking_mock_bp.route("/fund", methods=["POST"])
@login_required
def fund():

    data = request.json

    user = get_user()
    bank_acc = BankAccount.get(BankAccount.user == user)
    bank_acc.balance += data["amount"]
    bank_acc.save()


    return jsonify({"message" : "Funds Added. Go Pay Those Puppers!"})



@banking_mock_bp.route("/getdata", methods=["GET"])
@login_required
def get_data():

    user = get_user()

    bank_acc = BankAccount.get(BankAccount.user == user)
    if user.is_organisation:
        label = "income"
        trans = Transaction.select().where(Transaction.receiver_bank == bank_acc)
    else:
        label = "expenses"
        trans = Transaction.select().where(Transaction.payer_bank == bank_acc)

    result = {}
    result["balance"] = bank_acc.balance

    trans_dicts = []

    for t in trans:
        trans_dicts.append(t.to_dict())

    result[label] = trans_dicts


    return jsonify(result)



@banking_mock_bp.route("/transfer", methods=["POST"])
@login_required
def transfer():

    data = request.json
    payer = get_user()

    if payer.is_organisation == True:
        return jsonify({'error':True, 'message':'Organisations Cannot Donate, Please Create a Personal Account'}), 403


    payer_bank = BankAccount.get(BankAccount.user == payer)
    user = User.get(uid = data["receiver_uid"] )
    receiver_bank = BankAccount.get(user = user)

    transaction = Transaction(
        payer_bank=payer_bank,
        receiver_bank=receiver_bank,
        amount=data["amount"],
        post_ident=Post.get(Post.uid == data["post_uid"])
    )
    transaction.save()

    
    payer_bank.balance = payer_bank.balance - data["amount"]
    receiver_bank.balance = receiver_bank.balance + data["amount"]
    payer_bank.save()
    receiver_bank.save()


    if payer.is_organisation:
        label = "income"
        trans = Transaction.select().where(Transaction.receiver_bank == receiver_bank)
    else:
        label = "expenses"
        trans = Transaction.select().where(Transaction.payer_bank == payer_bank)

    result = {}
    result["balance"] = payer_bank.balance

    trans_dicts = []

    for t in trans:
        trans_dicts.append(t.to_dict)

    result[label] = trans_dicts


    return jsonify({
        "message" : "Transaction Success",
        "payload" : result
    })
    

