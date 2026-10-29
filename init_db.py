import sqlite3

# Connect to the database.
# If the file does not exist, SQLite creates it.
connection = sqlite3.connect("database.db")

# Read the SQL schema.
with open("schema.sql", "r", encoding="utf-8") as file:
    schema = file.read()

# Create the products table.
connection.executescript(schema)

# Save changes and close the connection.
connection.commit()
connection.close()

print("Database and products table created successfully!")