from flask import Blueprint, session, jsonify, request
from app.models import User, Post, Like, Session
from .auth_views import login_required

post_bp = Blueprint('post', __name__)

def get_user():
    sesh = Session.get(token=session['session_token'])
    user = sesh.user
    return user

@login_required
@post_bp.route("/create", methods=["POST"])
def create():
    data = request.json
    user = get_user()
    try:
        post = Post.create(**data, user=user)
        return jsonify({'error': False, 'message': 'Post successfully created', 'data':post.to_dict}), 201
    except:
        return jsonify({'error':True, 'message': 'Something went wrong :('}), 500

@login_required
@post_bp.route("/get/<uid>", methods=["GET"])
def get(uid):
    try:
        post = Post.get(uid = uid)
    except:
        return jsonify({"error": True, "message": "post not found"}), 404
    user = get_user()
    try:
        like = Like.get(post=post, user=user)
        if like.user == user and like.post == post:
            has_liked = True
    except:
        has_liked = False
    return jsonify({
        **post.to_dict,
        'has_liked': has_liked,
        'total_likes': post.likes.count()
    })

        
