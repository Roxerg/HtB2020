from flask import Blueprint, session, jsonify, request
from app.models import Session, User
from app.validators import UserValidator
from datetime import datetime, timedelta
import functools

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
                    session.pop('session_token')
                    return view(*args, **kwargs)
            except:
                session.pop('session_token')
                return jsonify({'error': True}), 403  
        else:
            return jsonify({'error': True}), 403   

@login_required
@auth_bp.route("/currentuser", methods = ["GET"])
def current_user():
    user = Session.get(token=session['session_token']).user
    return jsonify(user.to_dict)

@login_required
@auth_bp.route("/user/<uid>", methods=["GET"])
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
        user = User(**data)
    except:
        return jsonify({'error':True, 'message': 'bad request'}), 400
    user.set_password(password)
    user.save()
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
                return jsonify({'error':False, 'message':'Successfully logged in!', 'data': user.to_dict}), 200
    except:
        return jsonify({'error': True, 'message':'unknown error'}), 500

@login_required
@auth_bp.route('/logout')
def logout():
    if 'session_token' in session:
        del session['session_token']
        return jsonify({'error':False}), 200
    else:
        return jsonify({'error':True, 'message':'No session token found!'}), 400