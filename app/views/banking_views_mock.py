from flask import Blueprint, session, jsonify, request
from app.models import Session, User, BankAccount, Transaction, Post
from app.validators import UserValidator
from datetime import datetime, timedelta
import functools

from datetime import date



banking_mock_bp = Blueprint('banking_mock', __name__)

def get_user():
    sesh = Session.get(token=session['session_token'])
    user = sesh.user
    return user


def login_required(view):
    @functools.wraps(view)
    def wrapper(*args, **kwargs):
        if 'session_token' in session:
            try:
                # lower case session is a flask keyword, hence the sesh
                sesh = Session.get(token = session['session_token'])
                if datetime.now() - sesh.created_at > timedelta(days=14):
                    del session['session_token']
                    return jsonify({'error': True}), 403
                else:
                    session.pop('session_token')
                    return view(*args, **kwargs)
            except:
                session.pop('session_token')
                return jsonify({'error': True}), 403  
        else:
            return jsonify({'error': True}), 403
    return wrapper  



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
    receiver_bank = BankAccount.get(BankAccount.uid == data["receiver_uid"] )

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


    return jsonify({
        "message" : "Transaction Success",
        "amount" : data["amount"]
    })
    

