import flask
import logging
import pymysql.cursors

from api import register_apis
from util import DBConnectionManager

# from authentication_util import requires_auth

from flask import (Flask,
                   render_template,
                   request,
                   session)


app = Flask(__name__)

db_connection_manager = DBConnectionManager()

# Shhhh...
# app.secret_key = b"ECWX19omH08U8E3e"

logging.basicConfig()

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


@app.route("/")
# @requires_auth
def home():
    return render_template("home.html")


def main():
    logger.info("Loading app with Flask version {}".format(flask.__version__))

    register_apis(app, db_connection_manager.db)

    app.logger.handlers = logger.handlers
    app.logger.setLevel(logging.DEBUG)

    app.run(host="0.0.0.0",
            port=9000,
            use_reloader=True,
            debug=True
            )


if __name__ == "__main__":
    main()
else:
    gunicorn_logger = logging.getLogger("gunicorn.error")
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
