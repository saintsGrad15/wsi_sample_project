import pymysql.cursors


class DBConnectionManager(object):
    def __init__(self):
        self._generate_db()

    @property
    def db(self):
        if not self._db.open:
            self._generate_db()

        return self._db

    def _generate_db(self):
        self._db = pymysql.connect(host="localhost",
                                   db="wsi_sample_project",
                                   user="root",
                                   cursorclass=pymysql.cursors.DictCursor)


def coerce_products(*products):
    for product in products:
        product["price"] = float(product["price"])
