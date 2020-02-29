from flask import Blueprint, session, jsonify, request
from datetime import datetime, timedelta


file_bp = Blueprint('file', __name__)



@fille_bp.route("/save", methods=["POST"])
def save_file():
    data = request.json

    entry = {
        "user_id" : "???",
        "image_id" : data.pop("id"),
        "image_type" : "profile/post/etc"  
    }

    return jsonify("Image saved successfully!")



@file_bp.route("/fetch", methods=["POST"])
def fetch_file():
    data = request.json

    


