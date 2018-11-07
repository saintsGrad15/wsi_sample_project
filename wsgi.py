from app import app as application
from app import db_connection_manager

from api import register_apis

register_apis(application, db_connection_manager.db)

if __name__ == "__main__":
    application.run()
