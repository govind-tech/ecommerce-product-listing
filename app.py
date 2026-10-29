import sqlite3
from flask import Flask, render_template, jsonify

app = Flask(__name__)

DATABASE = "database.db"


def get_db_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/products", methods=["GET"])
def get_products():
    connection = get_db_connection()

    products = connection.execute(
        "SELECT * FROM products"
    ).fetchall()

    connection.close()

    return jsonify([dict(product) for product in products])


@app.route("/api/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    connection = get_db_connection()

    product = connection.execute(
        "SELECT * FROM products WHERE id = ?",
        (product_id,)
    ).fetchone()

    connection.close()

    if product is None:
        return jsonify({"error": "Product not found"}), 404

    return jsonify(dict(product))


if __name__ == "__main__":
    app.run(debug=True)