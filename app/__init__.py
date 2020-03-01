from flask import Flask, url_for
from flask_cors import CORS
from playhouse.flask_utils import FlaskDB

app = Flask(__name__)
app.config['SERVER_NAME'] = "127.0.0.1:5000"
db_wrapper = FlaskDB(app, 'sqlite:///db.sqlite')
from app.views import auth_bp, post_bp, banking_mock_bp
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(post_bp, url_prefix="/api/posts")
app.register_blueprint(banking_mock_bp, url_prefix="/api/banking_mock")
app.secret_key = "beep"
CORS(app)
with app.app_context():
    print(url_for('auth.register'))