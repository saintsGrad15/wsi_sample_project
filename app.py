# from authentication_util import requires_auth
from flask import (Flask,
                   render_template,
                   request,
                   session)

app = Flask(__name__)

# Shhhh...
# app.secret_key = b"ECWX19omH08U8E3e"


@app.route("/")
# @requires_auth
def home():
    return render_template("home.html")


def main():
    app.run(host="0.0.0.0",
            port=9000,
            use_reloader=True)


if __name__ == "__main__":
    main()
