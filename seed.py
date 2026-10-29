import sqlite3

connection = sqlite3.connect("database.db")

products = [
    (
        "Wireless Headphones",
        "Enjoy high-quality sound with wireless headphones.",
        1499.00,
        "images/headphones.png",
        "Electronics"
    ),
    (
        "Smart Watch",
        "Track your daily activities with a smart watch.",
        2499.00,
        "images/smartwatch.png",
        "Electronics"
    ),
    (
        "Keyboard",
        "A comfortable keyboard for work and gaming.",
        899.00,
        "images/keyboard.png",
        "Accessories"
    )
]

connection.executemany(
    """
    INSERT INTO products (name, description, price, image, category)
    VALUES (?, ?, ?, ?, ?)
    """,
    products
)

connection.commit()
connection.close()

print("Products inserted successfully!")