from flask import Blueprint, session, jsonify, request
from app.models import Session, User
from app.validators import UserValidator
from datetime import datetime, timedelta
import functools

import sys
sys.path.insert(0,'../..')

from vault.py_tm_vault_client.tmvault import TMVaultClient
from vault.py_tm_vault_client.tmvault.enums import CustomerGender, CustomerTitle

from vault.py_tm_vault_client.tmvault import TMVaultClient
from datetime import date


banking_bp = Blueprint('banking', __name__)


@login_required
@banking_bp.route("/fund", methods=["GET"])
def fund():

    return jsonify({})


@login_required
@banking_bp.route("/getdata", methods=["GET"])
def get_data():

    return jsonify({})


@login_required
@banking_bp.route("/transfer", methods=["PSOT"])
def transfer():