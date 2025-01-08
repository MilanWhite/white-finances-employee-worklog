from flask import Flask
from flask_cors import CORS
from models import db
from config import Config
from csrf import register_csrf_routes
from auth import auth_bp
from employee import employee_bp
from manager import manager_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(
        app,
        supports_credentials=True,
        resources={r"/*": {"origins": "http://localhost:5173"}},
    )
    register_csrf_routes(app)

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(employee_bp, url_prefix='/employee')
    app.register_blueprint(manager_bp, url_prefix='/manager')

    with app.app_context(): # remember to switch this
        try:
            db.create_all()
            print("Database tables created successfully.")
        except Exception as e:
            print(f"Error creating database tables: {e}")

    return app

if __name__ == "__main__":
    app = create_app()

    app.run(debug=True)
