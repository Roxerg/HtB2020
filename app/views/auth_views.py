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
                    return jsonify({'error': True}), 403
                else:
                    session.pop('session_token')
                    return view(*args, **kwargs)
            except:
                session.pop('session_token')
                return jsonify({'error': True}), 401
            

@auth_bp.route("/validate", methods=["POST"])
def validate():
    data = request.json
    try:
        validator = UserValidator()
        if validator.validate(form_data):
            return jsonify({'errors': {}}), 200
        else:
            return jsonify({'errors': validator.errors}), 400
    return jsonify({})

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
                session = Session.create(user=user)
                session.save()
                session['session_token'] = session.token
                return jsonify({'error':False, 'message':'Successfully logged in!', 'data': user.to_dict}), 200
    except:
        return jsonify({'error': True, 'message':'unknown error'}), 500

@login_required
@bp.route('/logout')
def logout():
    if 'session_token' in session:
        del session['session_token']
        return jsonify({'error':False}), 200
    else:
        return jsonify({'error':True, 'message':'No session token found!'}), 400