from flask import Blueprint, session, jsonify, request
from app.models import Session, User
from app.validators import UserValidator
from datetime import datetime, timedelta
import functools

import sys
sys.path.insert(0,'../..')

from vault.py_tm_vault_client.tmvault import TMVaultClient
from vault.py_tm_vault_client.tmvault.enums import CustomerGender, CustomerTitle

import vault.py_tm_vault_client.tmvault.client.transactions as tm_transactions
import vault.py_tm_vault_client.tmvault.client.accounts as tm_accounts

from vault.py_tm_vault_client.tmvault import TMVaultClient
from datetime import date

from auth_views import login_required
from post_views import get_user


banking_bp = Blueprint('banking', __name__)


@banking_bp.route("/fund", methods=["GET"])
@login_required
def fund():

    return jsonify({})


@banking_bp.route("/getdata", methods=["GET"])
@login_required
def get_data():

    user = get_user()

    acc_data = tm_accounts.get_account(account_id=user.vault_account_id)

    try :
        flow = tm_transactions.list_transactions(account_ids=[user.vault_account_id])
    except:
        flow = []

    try:
        acc_balance = acc_data.stonks_balances["DEFAULT"]
    except:
        acc_balance = acc_data.stonks_balances

    return jsonify({
        "balance" : acc_balance,
        "status" : acc_data.status.name,
        "transactions" : flow
        })


@banking_bp.route("/transfer", methods=["PSOT"])
@login_required
def transfer():


    created_payment = client.payments.create_payment(
    amount='10.01',
    currency='GBP',
    debtor_account_id=alice_personal_account.id_,
    debtor_sort_code=alice_personal_account.uk_sort_code,
    debtor_account_number=alice_personal_account.uk_account_number,
    creditor_account_id=joint_account.id_,
    creditor_sort_code=joint_account.uk_sort_code,
    creditor_account_number=joint_account.uk_account_number,
    reference='my first payment',
    metadata={'key': 'value'}
)


    return 0
    