from flask import Blueprint, session, jsonify, request
from app.models import Session, User, BankAccount
from app.validators import UserValidator
from datetime import datetime, timedelta
import functools

import random

import sys
sys.path.insert(0,'../..')

from vault.py_tm_vault_client.tmvault import TMVaultClient
from vault.py_tm_vault_client.tmvault.enums import CustomerGender, CustomerTitle

from vault.py_tm_vault_client.tmvault import TMVaultClient
from datetime import date


auth_bp = Blueprint('auth', __name__)

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
                    return view(*args, **kwargs)
            except:
                return jsonify({'error': True}), 403  
        else:
            return jsonify({'error': True}), 403 
    return wrapper 

@auth_bp.route("/currentuser", methods = ["GET"])
@login_required
def current_user():
    if 'session_token' in session:
        user = Session.get(token=session['session_token']).user
        return jsonify(user.to_dict)
    else:
        return jsonify({}), 204

@auth_bp.route("/user/<uid>", methods=["GET"])
@login_required
def get_user(uid):
    try:
        user = User.get(uid=uid)
    except:
        return jsonify({'error': True, 'message': 'Unknown user'}), 400
    return jsonify(user.to_dict), 200

@auth_bp.route("/validate", methods=["POST"])
def validate():
    data = request.json
    try:
        validator = UserValidator()
        if validator.validate(data):
            return jsonify({'errors': {}}), 200
        else:
            return jsonify({'errors': validator.errors}), 400
    except:
        return jsonify({'errors': {}}), 500

@auth_bp.route("/loggedin", methods=["GET"])
def is_logged_in():
    if 'session_token' in session:
        try:
            sesh = Session.get(token=session['session_token'])
            return jsonify({'loggedin': True}),200
        except:
            return jsonify({'loggedin': False}), 200       
    else:
        return jsonify({'loggedin': False}), 200

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    password = data.pop("password")

    try:
        customer_id, account_id = create_account({
            "title" : data["title"],
            "first_name" : data["name"],
            "last_name" : "",
            "dob" : data["dob"],
            "gender" : data["gender"],
            "nationality" : data["nationality"],
            "email_address" : data["email"]
        })
    except:
        pass

    
    try:
        user = User(**data) 
                    # vault_account_id = account_id, 
                    # vault_customer_id = customer_id)

    except:
        return jsonify({'error':True, 'message': 'bad request'}), 400
    user.set_password(password)
    user.save()
    starting_balance = 200
    if (data['is_organisation']):
        starting_balance = 0
    bank_acc = BankAccount(user=user, balance=starting_balance)
    bank_acc.save()
    sesh = Session.create(user=user)
    sesh.save()
    session['session_token'] = sesh.token
    return {'error': False, 'message':'User successfully created!', 'data': user.to_dict}, 201
    

@auth_bp.route('/login', methods=["POST"])
def login():
    data = request.json
    try:
        email = data.pop('email', None)
        password = data.pop('password', None)
        if email is None or password is None:
            return jsonify({'error': True, 'message':'Please supply your email and password!'}), 400
        else:
            try:
                user = User.get(email=email)
            except:
                return jsonify({'error': True, 'message':'User not found!'}), 400
            if not user.check_password(password):
                return jsonify({'error': True, 'message':'Invalid password!'}), 400
            else:
                sesh = Session.create(user=user)
                sesh.save()
                session['session_token'] = sesh.token
                session.modified = True
                return jsonify({'error':False, 'message':'Successfully logged in!', 'data': user.to_dict}), 200
    except:
        return jsonify({'error': True, 'message':'unknown error'}), 500

@auth_bp.route('/logout')
@login_required
def logout():
    if 'session_token' in session:
        del session['session_token']
        return jsonify({'error':False}), 200
    else:
        return jsonify({'error':True, 'message':'No session token found!'}), 400



#### VAULT API

def create_account(data):

    client = TMVaultClient('/home/findlay/Documents/hackathons/HtB2020/vault/data/vault-config.json')

    if data["title"] == "mr":
        data["title"] = CustomerTitle.CUSTOMER_TITLE_MR
    elif data["title"] == "miss":
        data["title"] = CustomerTitle.CUSTOMER_TITLE_MISS
    elif data["title"] == "mrs":
        data["title"] = CustomerTitle.CUSTOMER_TITLE_MRS
    else:
        data["title"] = CustomerTitle.CUSTOMER_TITLE_UNKNOWN


    if data["gender"] == "male":
        data["gender"] = CustomerGender.CUSTOMER_GENDER_MALE
    elif data["gender"] == "female":
        data["gender"] = CustomerGender.CUSTOMER_GENDER_FEMALE
    else: 
        data["gender"] = CustomerGender.CUSTOMER_GENDER_UNKNOWN


    customer_id = ''.join(random.choice("0123456789") for i in range(16))

    customer = client.customers.create_customer(
        customer_id= customer_id,
        title= data["title"],
        first_name=data["name"],
        last_name="",
        dob=data["dob"],
        gender=data["gender"],
        nationality=data["nationality"],
        email_address=data["email_address"]
    )

    account_id = customer_id+'_account_001'

    customer_account = client.accounts.create_account(
        account_id=account_id,
        product_id='current_account',
        stakeholder_customer_ids=[customer.id_]
    )



    return customer_id, account_id