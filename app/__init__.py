import os
from flask import Flask, render_template, request, session, redirect, url_for
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, login_user
from authlib.integrations.flask_client import OAuth





from .models import db, User
# from app.api.auth_routes import login
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.listing_routes import listing_routes
from .api.order_routes import order_routes
from .api.review_routes import review_routes
from .api.search_routes import search_routes
from .api.follow_routes import follow_routes
from .api.news_routes import news_routes


from .seeds import seed_commands

from .config import Config

app = Flask(__name__)
oauth = OAuth(app)



# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(listing_routes, url_prefix='/api/listings')
app.register_blueprint(order_routes, url_prefix='/api/orders')
app.register_blueprint(review_routes, url_prefix='/api/reviews')
app.register_blueprint(search_routes, url_prefix='/api/search')
app.register_blueprint(follow_routes, url_prefix='/api/follows')
app.register_blueprint(news_routes, url_prefix='/api/news')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


google = oauth.register(
    name='google',

    # Client ID is a publicly exposed string that is used by the service
    # API to identify the application
    client_id=app.config['GOOGLE_CLIENT_ID'],

    # Client Secret is used to authenticate the identity of the application
    # to the service API when the application requests to access a user???s
    # account, and must be kept private between the application and the API
    client_secret=app.config['GOOGLE_CLIENT_SECRET'],

    # ACCESS_TOKEN_URL: URL to fetch OAuth access token
    access_token_url='https://accounts.google.com/o/oauth2/token',

    # ACCESS_TOKEN_PARAMS: Extra parameters for Access Token endpoint
    access_token_params=None,

    # AUTHORIZE_URL: Endpoint for user authorization
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,

    # A base URL endpoint to make requests simple
    api_base_url='https://www.googleapis.com/oauth2/v1/',

    # Is a dict configuration to pass extra
    #  parameters to OAuth1Session or OAuth2Session
    # Scope: specifies the level of access that the application is requesting
    # OpenID Connect 1.0 is a simple identity layer on top of
    #  the OAuth 2.0 protocol. It allows Clients to verify the
    #  identity of the End-User based on the authentication performed
    #  by an Authorization Server
    # if we wanted to include address in ths scope:  https://www.googleapis.com/auth/user.addresses.read
    client_kwargs={'scope': 'openid profile email'},

    # jwks_uri: The URL to get provider???s public JWKS(JSON Web Key Set )
    # The JSON Web Key Set (JWKS) is a set of keys containing the public
    # keys used to verify any JSON Web Token (JWT)
    # issued by the authorization server
    jwks_uri="https://www.googleapis.com/oauth2/v3/certs",
)


@app.route('/login/google')
def google_login():
    google = oauth.create_client('google')
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)



@app.route('/authorize')
def authorize():

    google = oauth.create_client('google')
    token = google.authorize_access_token()
    print(google, 'google$$$$$$$$!!!!!!!!!!!!!!!!!!!!!')
    resp = google.get('userinfo')
    profile = resp.json()
    print(profile, 'profile in the request!!!!!!!!!!!!!!!')

    user = User.query.filter(User.email == profile['email']).first()
    print(user, 'user in the request!!!!!!!!!!!!!!!')
    if user:
        login_user(user)
    else:
        return redirect("https://groove-project.herokuapp.com/sign-up", 302)
    #     user = User(
    #         username=profile['name'],
    #         email=profile['email'],
    #         password=token['id_token']
    #     )
    #     db.session.add(user)
    #     db.session.commit()
    #     login_user(user)

    return redirect("https://groove-project.herokuapp.com/", 302)
