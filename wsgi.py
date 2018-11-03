from app import app as application
from app import db_connection

from api import register_apis

register_apis(application, db_connection)

if __name__ == "__main__":
    application.run()
