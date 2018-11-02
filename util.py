def coerce_products(*products):
    for product in products:
        product["price"] = float(product["price"])