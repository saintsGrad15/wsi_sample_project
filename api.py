import random

from time import sleep
from util import coerce_products

from flask import (jsonify,
                   make_response)


def register_apis(app, db_connection):
    @app.route("/api/get_top_sellers/")
    def get_top_sellers():
        # sleep(2)

        with db_connection.cursor() as cursor:
            query_string = "SELECT * FROM products"

            cursor.execute(query_string)

            all_products = cursor.fetchall()

            all_products_length = len(all_products)

            random_sample = random.sample(range(0, all_products_length), min(3, all_products_length))

            top_sellers = []

            for i, product in enumerate(all_products):
                if i in random_sample:
                    coerce_products(product)
                    product["price"] = float(product["price"])
                    top_sellers.append(product)

        return jsonify(top_sellers)

    @app.route("/api/get_product_by_id/<int:id_>")
    def get_product_by_id(id_):
        with db_connection.cursor() as cursor:
            query_string = "SELECT * FROM products WHERE products.id = {}".format(id_)

            cursor.execute(query_string)

            product = cursor.fetchone()

            if product is not None:
                coerce_products(product)

                return jsonify(product)
            else:
                return make_response("Product with id {} not found".format(id_), 404)
