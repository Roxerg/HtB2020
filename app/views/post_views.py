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
    except: 
        return jsonify({"error": True, "message": "I don't fucking know"}), 504


@post_bp.route("/get", methods=["GET"])
@login_required
def get_list():
    
    posts = []
    for p in Post.select(Post, Post.likes.count().alias("likes_count")):
        posts.append(p)

    if len(posts) == 0: 
        return jsonify({"error": False, "message": "no posts found"}), 204

    posts.sort(key=lambda p: p.likes_count, reverse=True)

    res = []
    user = get_user()
    for post in posts:
        try:
            like = Like.get(post=post, user=user)
            if like.user == user and like.post == post:
                has_liked = True
        except:
            has_liked = False

        res.append({
            **post.to_dict,
            'has_liked': has_liked,
            'total_likes': post.likes_count
        })

    return jsonify(res)
    

@post_bp.route("/like/<post_uid>/add", methods=["POST"])
@login_required
def add_like(post_uid):

    user = get_user()

    new_like = Like(user=user, post=Post.get(uid=post_uid))
    new_like.save() 


@post_bp.route("/like/<post_uid>/remove", methods=["DELETE"])
@login_required
def remove_like(post_uid):

    user = get_user()

    try:
        like = Like.get(post = Post.get(uid=post_uid), user = user)
        like.delete()
        return jsonify({"error": False, "message": "Like successfully removed"}), 200
    except:
        return jsonify({"error": True, "message": "Something went wrong."}), 500

