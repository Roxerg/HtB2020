from flask import Blueprint, session, jsonify, request
from app.models import Session, User
from app.validators import UserValidator
from datetime import datetime, timedelta
import functools

import sys
sys.path.insert(0,'../..')

from vault.py_tm_vault_client.tmvault import TMVaultClient
client = TMVaultClient('/home/roxerg/Projects/htb2020/vault/data/vault-config.json')
from vault.py_tm_vault_client.tmvault.enums import CustomerGender, CustomerTitle

#import vault.py_tm_vault_client.tmvault.client.transactions as tm_transactions
#import vault.py_tm_vault_client.tmvault.client.accounts as tm_accounts

from datetime import date


banking_bp = Blueprint('banking', __name__)

def get_user():
    print("---------")
    print(session)
    print("---------")
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





@banking_bp.route("/fund", methods=["GET"])
@login_required
def fund():




    return jsonify({})


#@login_required
@banking_bp.route("/getdata", methods=["GET"])
def get_data():

    #user = get_user()

    user = User.get(User.uid == "q1xd05vxlyzgmn81")

    acc_data = client.accounts.get_account(account_id=user.vault_account_id)

    try :
        flow = client.transactions.list_transactions(account_ids=[user.vault_account_id])
        print(flow)
        flow = list(flow)
    except:
        flow = []

    try:
        acc_balance = acc_data.stonks_balances["DEFAULT"].amount
    except:
        acc_balance = acc_data.stonks_balances
        

    return jsonify({
        "balance" : acc_balance,
        "status" : acc_data.status.name,
        "transactions" : flow
        })


# @login_required
@banking_bp.route("/transfer", methods=["POST"])
def transfer():

    data = request.json

    #user = get_user()

    user = User.get(User.uid == "q1xd05vxlyzgmn81")

    print(user.vault_account_id)
    #try:
    user_account_vault = client.accounts.get_account(
        account_id=user.vault_account_id
    )

    print("after ")
    #except:
    #    return jsonify({'error':True, 'message':'Your bank account not found'}), 404

    receiver = User.get(User.uid == data["receiver_uid"])

    print(receiver)

    try:
        receiver_vault = client.accounts.get_account(
            account_id=receiver.vault_account_id
        )
    except:
        return jsonify({'error':True, "message":"receiving account not found"}), 403


    try:
        created_payment = client.payments.create_payment(
            amount=data["amount"],
            currency="AAAHHHHHH",
            debtor_account_id=receiver.vault_account_id,
            debtor_sort_code=receiver_vault.uk_sort_code,
            debtor_account_number=receiver_vault.uk_account_number,

            creditor_account_id=user.vault_account_id,
            creditor_sort_code=user_account_vault.uk_sort_code,
            creditor_account_number=user_account_vault.uk_account_number,
            reference='Doggos!',
            metadata={'post_id': data["post_uid"]}
        )

        print("after pay")
    
    except: 
        return jsonify({'error':True, "message":"Something Went Wrong. Not Enough Funds?"}), 403


    return jsonify({"message" : "Success!"})
    