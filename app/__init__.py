from flask import Flask
from flask_cors import CORS
from playhouse.flask_utils import FlaskDB

app = Flask(__name__)
CORS(app)
db_wrapper = FlaskDB(app, 'sqlite://db.sqlite')